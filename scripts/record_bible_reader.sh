#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# ORHAR — Bible Library & Reader recorder
# ==============================================================================
#
# Records an Android emulator walkthrough focused on the Bible experience:
# 1. Start at Home top
# 2. Open Bible Library / Versions (top-right 2nd button / shortcut)
# 3. Scroll through available Bible translations
# 4. Return to Home
# 5. Open Bible tab
# 6. Select a Book (e.g. Gospel / Matthew)
# 7. Select a Chapter (Chapter 1)
# 8. Scroll through verses
# 9. Bookmark a verse
# 10. Open collapsible floating action group
# 11. Open Note editor / take a note
# 12. Trigger TTS audio playback (with active verse highlighting)
# 13. Return to Home
# 14. Scroll to top to create a perfect seamless loop!
#
# Usage:
#   scripts/record_bible_reader.sh [options]
#
# Examples:
#   scripts/record_bible_reader.sh --lang fr
#   scripts/record_bible_reader.sh --lang en --duration 48
#   scripts/record_bible_reader.sh --dry-run
# ==============================================================================

REPO_DIR="/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharWebsite/repo"
ASSETS_DIR="$REPO_DIR/assets"
TMP_DIR="/tmp/orhar-bible-record"
DEVICE_RAW="/sdcard/orhar_reader_native.mp4"
LOCAL_RAW="$TMP_DIR/reader_raw.mp4"

LANG_CODE="fr"
DURATION_SECONDS=48
BIT_RATE=6000000
SCALE="450:1000"
DRY_RUN=0
GLOBAL_OUTPUT=0

usage() {
  cat <<'EOF'
Usage:
  scripts/record_bible_reader.sh [options]

Options:
  --lang <code>       Export localized video to assets/videos/<code>/.
                      Supported: en fr es de it pt pl (default: fr)
  --global            Export to assets/reader.mp4 and assets/reader.webm.
  --duration <sec>    Android screenrecord duration. Default: 48.
  --bit-rate <bps>    Android screenrecord bit rate. Default: 6000000.
  --scale <WxH>       ffmpeg output scale. Default: 450:1000.
  --dry-run           Print the planned actions without recording.
  -h, --help          Show this help.

Examples:
  scripts/record_bible_reader.sh --lang fr
  scripts/record_bible_reader.sh --lang en --duration 48
  scripts/record_bible_reader.sh --dry-run
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

if [[ "$GLOBAL_OUTPUT" -eq 1 ]]; then
  TARGET_DIR="$ASSETS_DIR"
else
  TARGET_DIR="$ASSETS_DIR/videos/$LANG_CODE"
fi

TARGET_MP4="$TARGET_DIR/reader.mp4"
TARGET_WEBM="$TARGET_DIR/reader.webm"

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

keyevent() {
  run adb shell input keyevent "$1"
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

  adb shell uiautomator dump /sdcard/orhar_window.xml >/dev/null 2>&1 || true
  adb exec-out cat /sdcard/orhar_window.xml > "$xml_file" 2>/dev/null || true

  if [[ ! -s "$xml_file" ]]; then
    return 1
  fi

  coords="$(python3 - "$xml_file" "$@" <<'PY'
import html
import re
import sys

xml_path = sys.argv[1]
labels = [label.casefold() for label in sys.argv[2:] if label.strip()]
try:
    xml = open(xml_path, "r", encoding="utf-8", errors="ignore").read()
except Exception:
    sys.exit(1)

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
    if top < 120 or bottom > 2240:
        continue

    text = html.unescape(text_match.group(1)) if text_match else ""
    desc = html.unescape(desc_match.group(1)) if desc_match else ""
    haystack = f"{text} {desc}".casefold()

    if any(label in haystack for label in labels):
        matches.append(((left + right) // 2, (top + bottom) // 2, top))

if not matches:
    sys.exit(1)

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
  wait_for 0.8
}

record_bible_choreography() {
  echo "🎥 Démarrage screenrecord (${DURATION_SECONDS}s, bit-rate ${BIT_RATE})"
  cleanup_device_recording

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: adb shell screenrecord --bit-rate $BIT_RATE --time-limit $DURATION_SECONDS $DEVICE_RAW &"
  else
    adb shell screenrecord --bit-rate "$BIT_RATE" --time-limit "$DURATION_SECONDS" "$DEVICE_RAW" &
    REC_PID=$!
  fi

  wait_for 1.2
  echo "🎬 Début de la chorégraphie Lecteur & Bibliothèque Biblique"

  # --------------------------------------------------------------------------
  # 1. HOME — Découverte de l'écran d'accueil (2.0s)
  # --------------------------------------------------------------------------
  echo "👉 1. Home (position initiale)"
  wait_for 2.0

  # --------------------------------------------------------------------------
  # 2. OUVERTURE DE LA BIBLIOTHÈQUE DE BIBLES (2ème bouton en haut à droite: icône terre/versions)
  # Coordonnées exactes du 2ème bouton en haut à droite (x=920, y=140 sur 1080x2400)
  # --------------------------------------------------------------------------
  echo "👉 2. Ouverture de la Bibliothèque de Bibles (icône Versions en haut à droite)"
  tap 920 140
  wait_for 2.2

  # --------------------------------------------------------------------------
  # 3. SCROLL DANS LA BIBLIOTHÈQUE DE BIBLES (découverte des traductions)
  # --------------------------------------------------------------------------
  echo "👉 3. Défilement dans la Bibliothèque de Bibles"
  swipe 540 1650 540 850 650
  wait_for 1.8
  swipe 540 850 540 1650 600
  wait_for 1.5

  # --------------------------------------------------------------------------
  # 4. RETOUR SUR HOME
  # --------------------------------------------------------------------------
  echo "👉 4. Retour sur l'écran Home"
  keyevent 4
  wait_for 1.8

  # --------------------------------------------------------------------------
  # 5. OUVERTURE DE LA BIBLE (Barre du bas: Onglet Bible)
  # --------------------------------------------------------------------------
  echo "👉 5. Ouverture de la Bible via la barre de navigation du bas (onglet Bible)"
  # Tab Bible at x=324, y=2250 (sur 1080x2400)
  tap 324 2250
  wait_for 2.0

  # --------------------------------------------------------------------------
  # 6. SÉLECTION D'UN LIVRE (ex: Évangile selon Saint Matthieu)
  # --------------------------------------------------------------------------
  echo "👉 6. Sélection d'un livre biblique"
  if ! tap_text_any "Matthieu" "Matthew" "Mateo" "Matthäus" "Matteo" "Mateus" "Mateusz" "Jean" "John"; then
    tap 540 680
  fi
  wait_for 1.8

  # --------------------------------------------------------------------------
  # 7. SÉLECTION D'UN CHAPITRE (Chapitre 1)
  # On tente de cliquer sur le chapitre 1 (texte ou barre de navigation/grille)
  # --------------------------------------------------------------------------
  echo "👉 7. Sélection du chapitre (Chapitre 1 ou premier élément)"
  if ! tap_text_any "Matthieu 1" "Matthew 1" "Mt 1" "Chapitre 1" "Chapter 1" "Capítulo 1" "Kapitel 1" " 1 "; then
    echo "   Tap de secours sur la barre/grille de chapitre"
    tap 220 280 || tap 200 520
  fi
  wait_for 1.2
  # Au cas où un sélecteur/modal s'est ouvert, on clique sur le 1er chapitre
  tap 180 500 || true
  wait_for 2.0

  # --------------------------------------------------------------------------
  # 8. SCROLL DES VERSETS DANS LE LECTEUR
  # --------------------------------------------------------------------------
  echo "👉 8. Lecture & défilement fluide des versets"
  swipe 540 1700 540 950 700
  wait_for 1.6

  # --------------------------------------------------------------------------
  # 9. BOOKMARK D'UN VERSET
  # Tap sur l'icône signet / bookmark du verset visible
  # --------------------------------------------------------------------------
  echo "👉 9. Ajout d'un signet / bookmark sur un verset"
  if ! tap_text_any "bookmark" "Signet" "Favori"; then
    echo "   Tap de secours bookmark verset"
    tap 980 980 || tap 540 980
  fi
  wait_for 1.4

  # --------------------------------------------------------------------------
  # 10. OUVERTURE DU BOUTON COLLAPSE (Floating Action Group)
  # --------------------------------------------------------------------------
  echo "👉 10. Déploiement des actions flottantes (bouton collapse)"
  tap 960 1980
  wait_for 1.5

  # --------------------------------------------------------------------------
  # 11. PRISE D'UNE NOTE (Éditeur de note)
  # --------------------------------------------------------------------------
  echo "👉 11. Ouverture de l'éditeur de notes"
  if ! tap_text_any "Note" "Ajouter une note" "Add note"; then
    echo "   Tap de secours bouton note"
    tap 960 1760
  fi
  wait_for 1.8

  # Fermeture du modal de note (tap Enregistrer ou X)
  echo "   Fermeture/validation de la note"
  tap 1000 145 || tap 540 2100 || keyevent 4
  wait_for 1.4

  # --------------------------------------------------------------------------
  # 12. LECTURE AUDIO TTS (Voix IA & surlignage synchronisé)
  # --------------------------------------------------------------------------
  echo "👉 12. Démarrage de la lecture audio TTS"
  if ! tap_text_any "Écouter" "Listen" "Play" "Audio"; then
    echo "   Tap de secours audio TTS"
    tap 960 1860 || tap 540 2180
  fi
  wait_for 3.2

  # --------------------------------------------------------------------------
  # 13. RETOUR HOME
  # --------------------------------------------------------------------------
  echo "👉 13. Retour à l'onglet Home"
  tap 108 2250
  wait_for 1.6

  # --------------------------------------------------------------------------
  # 14. SCROLL HAUT POUR BOUCLAGE PARFAIT (Closing the Loop)
  # --------------------------------------------------------------------------
  echo "👉 14. Scroll vers le haut pour bouclage visuel parfait"
  swipe 540 680 540 1950 850
  wait_for 0.5
  swipe 540 680 540 1950 800
  wait_for 2.0

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: fin de la chorégraphie"
  else
    wait "$REC_PID" || true
    sleep 1
  fi
}

pull_and_encode() {
  echo "📥 Récupération de la vidéo native depuis l'appareil"
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
    echo "✅ Fichiers générés avec succès:"
    ls -lh "$TARGET_MP4" "$TARGET_WEBM"
  fi
}

echo "🎬 ORHAR Bible Reader & Library Recorder"
if [[ "$GLOBAL_OUTPUT" -eq 1 ]]; then
  echo "🌐 Mode global → $TARGET_DIR"
else
  echo "🌍 Mode langue: $LANG_CODE → $TARGET_DIR"
fi

check_environment
prepare_output
reset_to_home_top
record_bible_choreography
pull_and_encode
cleanup_device_recording

echo "✅ Enregistrement terminé avec succès."
