// Prevent number input
export const preventNumberInput = (e) => {
    if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
    }
};

// Prevent text input
export const preventTextInput = (e) => {
    if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
    }
};

// Allow only number input
export const allowOnlyNumbers = (e) => {
    const allowedKeys = [
        "Backspace", "Tab", "Delete", "ArrowLeft", "ArrowRight",
        ".", "/",
    ];

    // Allow digits, certain symbols, and other special keys
    if (
        !/^[0-9]$/.test(e.key) &&
        !allowedKeys.includes(e.key)
    ) {
        e.preventDefault();
    }
};

export const allowPhoneNumber = (e) => {
    const allowedKeys = [
        "Backspace", "Tab", "Delete", "ArrowLeft", "ArrowRight"
    ];

    // Allow digits, certain symbols, and other special keys
    if (
        !/^[0-9]$/.test(e.key) &&
        !allowedKeys.includes(e.key)
    ) {
        e.preventDefault();
    }
};

export const allowText = (e) => {
    const allowedKeys = /^[a-zA-Z]$/

    if (
        !["Backspace", " ", "Tab"].includes(e.key) &&
        !allowedKeys.test(e.key)
    ) {
        e.preventDefault();
    }

};

export const allowOnlyKhmerText = (e) => {
    const key = e.key;
    const shiftKey = e.shiftKey;

    const allowedControlKeys = [
        'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete',
    ];

    const isKhmerLetter =
        /^[\u1780-\u17DD]$/.test(key); // Khmer letters
    const isKhmerNumber =
        /^[\u17E0-\u17E9]$/.test(key); // Khmer numerals

    // Allow shift + number keys and control keys
    const isShiftedNumber =
        shiftKey && /^[1-9]$/.test(key);

    // Prevent if:
    // 1. It's not a valid Khmer letter or number (blocked),
    // 2. It's a Khmer number (blocked),
    // 3. It's not a regular number with shift pressed (allowed).
    if (
        !allowedControlKeys.includes(key) &&
        (!isKhmerLetter || isKhmerNumber) &&
        !isShiftedNumber
    ) {
        e.preventDefault();
    }
};

export const preventEnter = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
};

// p mean part

export const formatAccountNumber = (e) => {
    const digits = e.replace(/\D/g, "");
    const formatted = digits.replace(/^(\d{3})(\d{0,10})$/, (_, p1, p2) =>
        [p1, p2].filter(Boolean).join("-")
    );
    return formatted;
};

export const removeHyphen = (e) => e.replace(/-/g, "");
