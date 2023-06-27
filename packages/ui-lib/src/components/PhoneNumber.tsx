
export default function renderPhoneNumber({ dialCode, phone }: { dialCode: string, phone: string }) {
    
    const 
    hyphenate = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6, 10);

    return `+${dialCode}-${hyphenate}`;
}
