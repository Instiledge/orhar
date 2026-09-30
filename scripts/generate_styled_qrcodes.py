#!/usr/bin/env python3
"""
scripts/generate_styled_qrcodes.py
Generates customized, high-resolution ORHAR branded QR codes
with organic rounded shapes, squircle finder eyes, and the ORHAR mountain logo at the center.
"""

import os
import qrcode
from PIL import Image, ImageDraw

def generate_styled_qr(data_url, logo_path, output_path, target_size=1148):
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=32,
        border=4
    )
    qr.add_data(data_url)
    qr.make(fit=True)
    matrix = qr.get_matrix()
    matrix_size = len(matrix)

    box_size = 32
    img_size = matrix_size * box_size
    img = Image.new('RGBA', (img_size, img_size), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)

    color_primary = (11, 24, 42, 255) # #0b182a navy

    b = 4

    def in_finder_zone(r, c):
        # top-left
        if r < b + 8 and c < b + 8:
            return True
        # top-right
        if r < b + 8 and c >= matrix_size - b - 8:
            return True
        # bottom-left
        if r >= matrix_size - b - 8 and c < b + 8:
            return True
        return False

    center_start = matrix_size // 2 - 4
    center_end = matrix_size // 2 + 4
    def is_center(r, c):
        return center_start <= r <= center_end and center_start <= c <= center_end

    # 1. Draw body modules with fluid connections
    for r in range(matrix_size):
        for c in range(matrix_size):
            if in_finder_zone(r, c) or is_center(r, c) or not matrix[r][c]:
                continue
            
            x = c * box_size
            y = r * box_size
            rad = int(box_size * 0.44)

            top = r > 0 and matrix[r-1][c] and not in_finder_zone(r-1, c) and not is_center(r-1, c)
            bottom = r < matrix_size-1 and matrix[r+1][c] and not in_finder_zone(r+1, c) and not is_center(r+1, c)
            left = c > 0 and matrix[r][c-1] and not in_finder_zone(r, c-1) and not is_center(r, c-1)
            right = c < matrix_size-1 and matrix[r][c+1] and not in_finder_zone(r, c+1) and not is_center(r, c+1)

            pad = int(box_size * 0.08)
            if right:
                draw.rectangle([x + rad, y + pad, x + box_size + rad, y + box_size - pad], fill=color_primary)
            if bottom:
                draw.rectangle([x + pad, y + rad, x + box_size - pad, y + box_size + rad], fill=color_primary)

            draw.rounded_rectangle([x + pad, y + pad, x + box_size - pad, y + box_size - pad], radius=rad, fill=color_primary)

    # 2. Finder Pattern Eyes (Smooth Squircles with 1-module white separator)
    finder_positions = [
        (b, b),
        (b, matrix_size - b - 7),
        (matrix_size - b - 7, b)
    ]

    for (fr, fc) in finder_positions:
        fx = fc * box_size
        fy = fr * box_size
        f_size = 7 * box_size
        
        # White separator around finder (8x8)
        draw.rectangle([fx - box_size, fy - box_size, fx + f_size + box_size, fy + f_size + box_size], fill=(255, 255, 255, 255))
        # Outer rounded square (7x7)
        draw.rounded_rectangle([fx, fy, fx + f_size, fy + f_size], radius=int(box_size * 2.2), fill=color_primary)
        # Inner white square (5x5)
        draw.rounded_rectangle([fx + box_size, fy + box_size, fx + f_size - box_size, fy + f_size - box_size], radius=int(box_size * 1.5), fill=(255, 255, 255, 255))
        # Center solid eye (3x3)
        draw.rounded_rectangle([fx + 2 * box_size, fy + 2 * box_size, fx + f_size - 2 * box_size, fy + f_size - 2 * box_size], radius=int(box_size * 0.9), fill=color_primary)

    # 3. Center Logo Area Card with rounded corners
    logo_px_start = center_start * box_size
    logo_px_end = (center_end + 1) * box_size
    card_margin = int(box_size * 0.2)
    draw.rounded_rectangle(
        [logo_px_start - card_margin, logo_px_start - card_margin, logo_px_end + card_margin, logo_px_end + card_margin],
        radius=int(box_size * 1.5),
        fill=(255, 255, 255, 255)
    )

    # 4. Paste Logo
    logo = Image.open(logo_path).convert('RGBA')
    logo_size = int((logo_px_end - logo_px_start + 2 * card_margin) * 0.86)
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    paste_x = (img_size - logo_size) // 2
    paste_y = (img_size - logo_size) // 2
    img.paste(logo, (paste_x, paste_y), logo)

    # 5. Output
    final_img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)
    os.makedirs(os.path.dirname(output_path) if os.path.dirname(output_path) else '.', exist_ok=True)
    final_img.save(output_path, 'PNG')
    print(f"Generated: {output_path} -> {data_url}")

if __name__ == '__main__':
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo = os.path.join(repo_dir, 'logo.png')
    
    languages = ['en', 'fr', 'es', 'de', 'it', 'pt', 'pl']
    
    # Generate for all languages
    for lang in languages:
        out_file = os.path.join(repo_dir, lang, f"qr-subscribe-{lang}.png")
        url = f"https://orhar.com/{lang}/#newsletter"
        generate_styled_qr(url, logo, out_file)
        
    # Generate for contact page / root
    contact_qr = os.path.join(repo_dir, 'qr-subscribe.png')
    generate_styled_qr("https://orhar.com/contact.html#newsletter", logo, contact_qr)
    
    print("\n All stylized QR codes generated successfully with ORHAR logo!")
