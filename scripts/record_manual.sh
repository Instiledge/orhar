#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# ORHAR — Enregistreur Manuel Interactif (Chorégraphie Guidée)
# ==============================================================================
#
# Lance un compte à rebours pour vous laisser prêt sur l'émulateur,
# enregistre votre manipulation en direct, puis arrête et encode
# automatiquement en MP4 (H.264) et WebM (VP9) pour le site web.
#
# Usage:
#   scripts/record_manual.sh --lang <fr|en|es|de|it|pt|pl> [--name <reader|teaser>]
#
# Exemples:
#   scripts/record_manual.sh --lang fr
#   scripts/record_manual.sh --lang fr --name reader
#   scripts/record_manual.sh --lang en --name reader
# ==============================================================================

REPO_DIR="/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharWebsite/repo"
ASSETS_DIR="$REPO_DIR/assets"
TMP_DIR="/tmp/orhar-manual-record"
DEVICE_RAW="/sdcard/orhar_manual_native.mp4"
LOCAL_RAW="$TMP_DIR/manual_raw.mp4"

LANG_CODE="fr"
NAME="reader"
BIT_RATE=8000000
SCALE="450:1000"
MAX_SECONDS=120

while [[ $# -gt 0 ]]; do
  case "$1" in
    --lang)
      LANG_CODE="${2:-fr}"
      shift 2
      ;;
    --name)
      NAME="${2:-reader}"
      shift 2
      ;;
    --scale)
      SCALE="${2:-450:1000}"
      shift 2
      ;;
    --max-time)
      MAX_SECONDS="${2:-120}"
      shift 2
      ;;
    -h|--help)
      echo "Usage: scripts/record_manual.sh --lang <code (fr/en/es/de/it/pt/pl)> [--name <reader|teaser>]"
      exit 0
      ;;
    *)
      echo "❌ Option inconnue: $1" >&2
      exit 2
      ;;
  esac
done

if [[ ! "$LANG_CODE" =~ ^(en|fr|es|de|it|pt|pl)$ ]]; then
  echo "❌ Langue non supportée: $LANG_CODE" >&2
  echo "   Langues supportées: en fr es de it pt pl" >&2
  exit 2
fi

TARGET_DIR="$ASSETS_DIR/videos/$LANG_CODE"
TARGET_MP4="$TARGET_DIR/${NAME}.mp4"
TARGET_WEBM="$TARGET_DIR/${NAME}.webm"

mkdir -p "$TARGET_DIR"
mkdir -p "$TMP_DIR"

# Vérification ADB
if ! command -v adb >/dev/null 2>&1; then
  echo "❌ Commande adb introuvable." >&2
  exit 1
fi
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "❌ Commande ffmpeg introuvable." >&2
  exit 1
fi

DEVICES="$(adb devices | awk 'NR > 1 && $2 == "device" {print $1}')"
if [[ -z "$DEVICES" ]]; then
  echo "❌ Aucun émulateur/appareil Android détecté via adb." >&2
  exit 1
fi

adb shell rm -f "$DEVICE_RAW" >/dev/null 2>&1 || true

echo "========================================================"
echo "🎬 ENREGISTREUR MANUEL ORHAR"
echo "🌍 Langue : $LANG_CODE | Module : $NAME"
echo "📂 Sortie : $TARGET_DIR/"
echo "========================================================"
echo ""
echo "👉 Placez-vous sur l'écran Home de l'application."
echo "👉 Décompte dans :"
for i in 3 2 1; do
  echo "   ⏳ $i..."
  sleep 1
done
echo "   🟢 C'EST PARTI ! Enregistrement en cours..."
echo ""

# Démarrage de l'enregistrement en arrière-plan
adb shell screenrecord --bit-rate "$BIT_RATE" --time-limit "$MAX_SECONDS" "$DEVICE_RAW" &
REC_PID=$!

echo "--------------------------------------------------------"
echo "👉 Effectuez votre chorégraphie sur l'émulateur."
echo "👉 Une fois terminé (retour Home & scroll haut), appuyez sur [ENTRÉE] ici :"
echo "--------------------------------------------------------"

read -r _ || true

echo ""
echo "🛑 Arrêt de l'enregistrement..."
# Envoyer SIGINT (-2) au processus screenrecord sur l'appareil pour finaliser l'en-tête MP4 (moov atom)
adb shell "kill -2 \$(pidof screenrecord)" >/dev/null 2>&1 || adb shell pkill -2 screenrecord >/dev/null 2>&1 || true

# Attendre que screenrecord sur l'appareil termine d'écrire et se ferme proprement
while adb shell pidof screenrecord >/dev/null 2>&1; do
  sleep 0.5
done
wait "$REC_PID" 2>/dev/null || true
sleep 1

echo "📥 Rapatriement de la vidéo brute..."
adb pull "$DEVICE_RAW" "$LOCAL_RAW"
adb shell rm -f "$DEVICE_RAW" >/dev/null 2>&1 || true

echo "⚙️ Encodage Web haute fidélité (MP4 H.264 + WebM VP9)..."
ffmpeg -y \
  -i "$LOCAL_RAW" \
  -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 \
  -shortest \
  -vf "scale=$SCALE" \
  -c:v libx264 -profile:v main -level 3.1 -pix_fmt yuv420p -crf 22 -preset slow \
  -c:a aac -b:a 32k \
  -movflags +faststart \
  "$TARGET_MP4"

ffmpeg -y \
  -i "$LOCAL_RAW" \
  -vf "scale=$SCALE" \
  -c:v libvpx-vp9 -b:v 0 -crf 30 -an \
  "$TARGET_WEBM"

echo ""
echo "========================================================"
echo "✅ Enregistrement terminé et encodé avec succès :"
ls -lh "$TARGET_MP4" "$TARGET_WEBM"
echo "========================================================"
