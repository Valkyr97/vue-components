export const contrast = (hex: string) => {
    let threshold = 149;
    let r: any = 0, g: any = 0, b: any = 0;

    // 3 digits
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
        // 6 digits
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    return ((r * 0.299 + g * 0.587 + b * 0.114) > threshold) ? '#000000' : '#ffffff';
}