const srgbChannelToLinear = (channel: number): number => {
	const normalized = channel / 255;
	return normalized <= 0.03928
		? normalized / 12.92
		: Math.pow((normalized + 0.055) / 1.055, 2.4);
};

const relativeLuminance = (hex: string): number => {
	const normalizedHex = hex.replace("#", "");
	const r = parseInt(normalizedHex.substring(0, 2), 16);
	const g = parseInt(normalizedHex.substring(2, 4), 16);
	const b = parseInt(normalizedHex.substring(4, 6), 16);

	return (
		0.2126 * srgbChannelToLinear(r) +
		0.7152 * srgbChannelToLinear(g) +
		0.0722 * srgbChannelToLinear(b)
	);
};

export const contrastRatio = (foregroundHex: string, backgroundHex: string): number => {
	const foregroundLuminance = relativeLuminance(foregroundHex);
	const backgroundLuminance = relativeLuminance(backgroundHex);
	const lighter = Math.max(foregroundLuminance, backgroundLuminance);
	const darker = Math.min(foregroundLuminance, backgroundLuminance);

	return (lighter + 0.05) / (darker + 0.05);
};
