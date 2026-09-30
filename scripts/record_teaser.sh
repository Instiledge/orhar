#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# ORHAR — App teaser recorder
# ==============================================================================
#
# Records a short Android emulator walkthrough and exports browser-friendly
# MP4/WebM files for the website.
#
# Default output keeps the current website contract:
#   assets/teaser.mp4
#   assets/teaser.webm
#
# For localized recordings:
#   scripts/record_teaser.sh --lang fr
# exports:
#   assets/videos/fr/teaser.mp4
#   assets/videos/fr/teaser.webm
#
# The choreography assumes a 1080x2400 Android emulator with ORHAR already open,
# unlocked, logged in, and placed on Home in the target app language.
# ==============================================================================

REPO_DIR="/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharWebsite/repo"
ASSETS_DIR="$REPO_DIR/assets"
TMP_DIR="/tmp/orhar-teaser-record"
DEVICE_RAW="/sdcard/orhar_teaser_native.mp4"
LOCAL_RAW="$TMP_DIR/teaser_raw.mp4"

LANG_CODE=""
DURATION_SECONDS=42
BIT_RATE=6000000
SCALE="450:1000"
DRY_RUN=0
GLOBAL_OUTPUT=0

usage() {
  cat <<'EOF'
Usage:
  scripts/record_teaser.sh [options]

Options:
  --lang <code>       Export localized video to assets/videos/<code>/.
                      Supported: en fr es de it pt pl
  --global            Export to assets/teaser.mp4 and assets/teaser.webm.
                      This is the legacy/current website path.
  --duration <sec>    Android screenrecord duration. Default: 32.
  --bit-rate <bps>    Android screenrecord bit rate. Default: 6000000.
  --scale <WxH>       ffmpeg output scale. Default: 450:1000.
  --dry-run           Print the planned actions without recording.
  -h, --help          Show this help.

Examples:
  scripts/record_teaser.sh --global
  scripts/record_teaser.sh --lang fr
  scripts/record_teaser.sh --lang en --duration 24
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --lang)
      LANG_CODE="${2:-}"
      shift 2
      ;;
    --global)
      GLOBAL_OUTPUT=1
      shift
      ;;
    --duration)
      DURATION_SECONDS="${2:-}"
      shift 2
      ;;
    --bit-rate)
      BIT_RATE="${2:-}"
      shift 2
      ;;
    --scale)
      SCALE="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "❌ Option inconnue: $1" >&2
      usage
      exit 2
      ;;
  esac
done

if [[ -n "$LANG_CODE" && ! "$LANG_CODE" =~ ^(en|fr|es|de|it|pt|pl)$ ]]; then
  echo "❌ Langue non supportée: $LANG_CODE" >&2
  echo "   Langues supportées: en fr es de it pt pl" >&2
  exit 2
fi

if [[ "$GLOBAL_OUTPUT" -eq 1 || -z "$LANG_CODE" ]]; then
  TARGET_DIR="$ASSETS_DIR"
else
  TARGET_DIR="$ASSETS_DIR/videos/$LANG_CODE"
fi

TARGET_MP4="$TARGET_DIR/teaser.mp4"
TARGET_WEBM="$TARGET_DIR/teaser.webm"

run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    printf 'DRY-RUN:'
    printf ' %q' "$@"
    printf '\n'
  else
    "$@"
  fi
}

tap() {
  run adb shell input tap "$1" "$2"
}

deep_link() {
  local screen="$1"
  run adb shell am start -W -a android.intent.action.VIEW -d "orhar://navigate/$screen"
}

swipe() {
  run adb shell input swipe "$1" "$2" "$3" "$4" "$5"
}

wait_for() {
  local seconds="$1"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: sleep $seconds"
  else
    sleep "$seconds"
  fi
}

tap_text_any() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: tap first visible UI text among: $*"
    return 0
  fi

  local xml_file="$TMP_DIR/window.xml"
  local coords

  adb shell uiautomator dump /sdcard/orhar_window.xml >/dev/null
  adb exec-out cat /sdcard/orhar_window.xml > "$xml_file"

  coords="$(python3 - "$xml_file" "$@" <<'PY'
import html
import re
import sys

xml_path = sys.argv[1]
labels = [label.casefold() for label in sys.argv[2:] if label.strip()]
xml = open(xml_path, "r", encoding="utf-8", errors="ignore").read()

matches = []
for node_match in re.finditer(r"<node\b[^>]*>", xml):
    node = node_match.group(0)
    text_match = re.search(r'text="([^"]*)"', node)
    desc_match = re.search(r'content-desc="([^"]*)"', node)
    bounds_match = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', node)
    if not bounds_match:
        continue

    left, top, right, bottom = map(int, bounds_match.groups())
    if right <= left or bottom <= top:
        continue
    if top < 180 or bottom > 2140:
        continue

    text = html.unescape(text_match.group(1)) if text_match else ""
    desc = html.unescape(desc_match.group(1)) if desc_match else ""
    haystack = f"{text} {desc}".casefold()

    if any(label in haystack for label in labels):
        matches.append(((left + right) // 2, (top + bottom) // 2, top))

if not matches:
    sys.exit(1)

# Prefer the first matching element from top to bottom. On Home this targets the
# visible shortcut card before a larger duplicated section title lower down.
x, y, _ = sorted(matches, key=lambda item: item[2])[0]
print(x, y)
PY
)"

  if [[ -z "$coords" ]]; then
    return 1
  fi

  echo "🎯 Tap texte détecté: $coords ($*)"
  tap $coords
}

open_mypath_from_home() {
  echo "🧭 Recherche du raccourci MyPath/Mon Chemin dans Home"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: scroll Home until MyPath shortcut is visible, then tap it"
    return 0
  fi

  local attempt
  for attempt in 1 2 3 4; do
    if tap_text_any \
      "My Path" \
      "Mon Chemin" \
      "Mi Sendero" \
      "Mein Weg" \
      "Il Mio Percorso" \
      "Meu Caminho" \
      "Moja Ścieżka"; then
      return 0
    fi

    echo "   MyPath non visible, scroll Home (${attempt}/4)"
    swipe 540 1780 540 760 600
    wait_for 0.8
  done

  echo "❌ Raccourci MyPath introuvable après recherche dynamique." >&2
  return 1
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "❌ Commande manquante: $1" >&2
    exit 1
  fi
}

check_environment() {
  require_command adb
  require_command ffmpeg
  require_command python3

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: skip adb device readiness check"
    return
  fi

  local devices
  devices="$(adb devices | awk 'NR > 1 && $2 == "device" {print $1}')"
  if [[ -z "$devices" ]]; then
    echo "❌ Aucun émulateur/appareil Android prêt via adb." >&2
    echo "   Ouvre l’émulateur, déverrouille-le, puis relance le script." >&2
    exit 1
  fi

  local count
  count="$(printf '%s\n' "$devices" | sed '/^$/d' | wc -l | tr -d ' ')"
  if [[ "$count" != "1" ]]; then
    echo "❌ Plusieurs appareils adb détectés. Spécifie d’abord le bon appareil côté adb." >&2
    printf '%s\n' "$devices" >&2
    exit 1
  fi
}

prepare_output() {
  run mkdir -p "$TARGET_DIR"
  run mkdir -p "$TMP_DIR"
}

cleanup_device_recording() {
  if [[ "$DRY_RUN" -eq 0 ]]; then
    adb shell rm -f "$DEVICE_RAW" >/dev/null 2>&1 || true
  fi
}

reset_to_home_top() {
  echo "📱 Réinitialisation visuelle: onglet Home + haut de page"
  deep_link Home
  wait_for 1.0
  swipe 540 520 540 2020 350
  wait_for 0.25
  swipe 540 520 540 2020 350
  wait_for 0.25
  swipe 540 520 540 2020 350
  wait_for 0.25
  swipe 540 520 540 2020 350
  wait_for 0.8
}

record_choreography() {
  echo "🎥 Démarrage screenrecord (${DURATION_SECONDS}s, bit-rate ${BIT_RATE})"
  cleanup_device_recording

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: adb shell screenrecord --bit-rate $BIT_RATE --time-limit $DURATION_SECONDS $DEVICE_RAW &"
  else
    adb shell screenrecord --bit-rate "$BIT_RATE" --time-limit "$DURATION_SECONDS" "$DEVICE_RAW" &
    REC_PID=$!
  fi

  wait_for 1
  echo "🎬 Chorégraphie: Home haut → tabs → Home → Daily Quotation → Meditbrary → Home → MyPath → Home haut"

  # Start at Home top. The reset_to_home_top function already placed us there.
  wait_for 2.0

  # Bottom tabs on a 1080x2400 emulator:
  # Home=108, Bible=324, ParoBible=540, Plan=756, Quiz=972 at y=2250.
  tap 324 2250
  wait_for 2.6
  tap 540 2250
  wait_for 2.6
  tap 756 2250
  wait_for 2.6
  tap 972 2250
  wait_for 2.6
  tap 108 2250
  wait_for 1.6

  # Home: scroll down until Daily Quotation is visible, then tap the quotation text.
  swipe 540 1780 540 760 600
  wait_for 1.1
  tap 540 1450
  wait_for 1.2
  swipe 540 1780 540 980 600
  wait_for 1.1

  # Close Meditbrary via the visible X button in the top-right header.
  tap 1000 145
  wait_for 1.4

  # The Home feed is dynamic: cards like Quiz progress can appear between Daily
  # Quotation and MyPath. Search the real visible UI text instead of tapping a
  # fixed coordinate, so we do not accidentally open Settings.
  open_mypath_from_home
  wait_for 1.2
  swipe 540 1780 540 980 600
  wait_for 1.1

  # Close MyPath via the visible X button in the top-right header.
  tap 1000 145
  wait_for 1.4

  # Finish by bringing Home back toward the top. A few slow swipes are enough
  # from the MyPath section without recreating the visible overscroll/bounce
  # caused by repeated aggressive top swipes.
  swipe 540 720 540 1980 900
  wait_for 0.45
  swipe 540 720 540 1900 800
  wait_for 0.45
  swipe 540 720 540 1880 750
  wait_for 1.6

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: wait for recording"
  else
    wait "$REC_PID" || true
    sleep 1
  fi
}

pull_and_encode() {
  echo "📥 Récupération de la vidéo native"
  run adb pull "$DEVICE_RAW" "$LOCAL_RAW"

  echo "⚙️ Encodage MP4 Safari/Chrome + WebM moderne"
  run ffmpeg -y \
    -i "$LOCAL_RAW" \
    -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
    -shortest \
    -vf "scale=$SCALE" \
    -c:v libx264 -profile:v main -level 3.1 -pix_fmt yuv420p -crf 23 -preset slow \
    -c:a aac -b:a 32k \
    -movflags +faststart \
    "$TARGET_MP4"

  run ffmpeg -y \
    -i "$LOCAL_RAW" \
    -vf "scale=$SCALE" \
    -c:v libvpx-vp9 -b:v 0 -crf 30 -an \
    "$TARGET_WEBM"

  if [[ "$DRY_RUN" -eq 0 ]]; then
    echo "✅ Fichiers générés:"
    ls -lh "$TARGET_MP4" "$TARGET_WEBM"
  fi
}

echo "🎬 ORHAR teaser recorder"
if [[ -n "$LANG_CODE" && "$GLOBAL_OUTPUT" -eq 0 ]]; then
  echo "🌍 Mode langue: $LANG_CODE → $TARGET_DIR"
else
  echo "🌐 Mode global → $TARGET_DIR"
fi

check_environment
prepare_output
reset_to_home_top
record_choreography
pull_and_encode
cleanup_device_recording

echo "Terminé."
