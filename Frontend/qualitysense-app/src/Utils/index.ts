export const cleanText = (text: string) => {
    return text.replace(/[#*`']+/g, '');
};