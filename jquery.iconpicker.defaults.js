/*** Defaults ***/

if (typeof window.APP == 'undefined') {
    window.APP = {};
}

if (typeof window.APP.VENDORS == 'undefined') {
    window.APP.VENDORS = {};
}

if (typeof window.APP.VENDORS.DEFAULTS == 'undefined') {
    window.APP.VENDORS.DEFAULTS = {};
}

window.APP.VENDORS.DEFAULTS.iconpicker = {
    default: {
        icons: [{
            "title": "",
            "searchTerms": []
        }, {
            "title": "fa-solid fa-phone",
            "searchTerms": ["Left Hand Telephone Receiver", "call", "earphone", "number", "phone", "receiver", "support", "talking", "telephone", "telephone receiver", "voice"]
        }, {
            "title": "fa-solid fa-envelope",
            "searchTerms": ["Back of Envelope", "e-mail", "email", "envelope", "letter", "mail", "message", "newsletter", "notification", "offer", "support"]
        }, {
            "title": "fa-solid fa-face-awesome",
            "searchTerms": ["amazing", "awesome", "grin", "look", "smile", "troll"]
        }, {
            "title": "fa-solid fa-poo",
            "searchTerms": ["crap", "dung", "face", "monster", "pile of poo", "poo", "poop", "shit", "smile", "turd", "uer"]
        }, {
            "title": "fa-solid fa-comment",
            "searchTerms": [" conversation", " discussion", " talking", "Right Speech Bubble", "answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "talk", "texting"]
        }, {
            "title": "fa-solid fa-face-smile",
            "searchTerms": ["approve", "default", "emoticon", "face", "happy", "rating", "satisfied", "slightly smiling face", "smile", "uer"]
        }, {
            "title": "fa-solid fa-inbox",
            "searchTerms": ["archive", "desk", "email", "mail", "message"]
        }, {
            "title": "fa-solid fa-video",
            "searchTerms": ["camera", "film", "movie", "record", "video-camera"]
        }, {
            "title": "fa-solid fa-comments",
            "searchTerms": [" conversation", " discussion", " talking", "Two Speech Bubbles", "answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "talk", "texting"]
        }, {
            "title": "fa-solid fa-paper-plane",
            "searchTerms": ["air", "float", "fold", "mail", "paper", "send"]
        }, {
            "title": "fa-solid fa-address-book",
            "searchTerms": ["contact", "directory", "employee", "index", "little black book", "portfolio", "rolodex", "uer", "username"]
        }, {
            "title": "fa-solid fa-quote-left",
            "searchTerms": ["Left Double Quotation Mark", "mention", "note", "phrase", "text", "type"]
        }, {
            "title": "fa-solid fa-envelopes",
            "searchTerms": ["email"]
        }, {
            "title": "fa-solid fa-thought-bubble",
            "searchTerms": ["Right Thought Bubble", "balloon", "bubble", "comic", "dream", "idea", "imagination", "think", "thought", "thought balloon"]
        }, {
            "title": "fa-solid fa-phone-volume",
            "searchTerms": ["call", "earphone", "number", "sound", "support", "talking", "telephone", "voice", "volume-control-phone"]
        }, {
            "title": "fa-solid fa-mobile",
            "searchTerms": ["android", "call", "cell", "cell phone", "device", "mobile", "mobile phone", "number", "phone", "screen", "telephone", "text"]
        }, {
            "title": "fa-solid fa-address-card",
            "searchTerms": ["about", "contact", "employee", "id", "identification", "portfolio", "postcard", "profile", "registration", "uer", "username"]
        }, {
            "title": "fa-solid fa-quote-right",
            "searchTerms": ["Right Double Quotation Mark", "mention", "note", "phrase", "text", "type"]
        }, {
            "title": "fa-solid fa-video-slash",
            "searchTerms": ["add", "create", "disabled", "disconnect", "film", "new", "positive", "record", "video"]
        }, {
            "title": "fa-solid fa-tty",
            "searchTerms": ["communication", "deaf", "telephone", "teletypewriter", "text"]
        }, {
            "title": "fa-solid fa-icons",
            "searchTerms": ["bolt", "category", "emoji", "heart", "image", "music", "photo", "symbols"]
        }, {
            "title": "fa-solid fa-language",
            "searchTerms": ["dialect", "idiom", "localize", "speech", "translate", "vernacular"]
        }, {
            "title": "fa-solid fa-walkie-talkie",
            "searchTerms": ["communication", "copy", "intercom", "over", "portable", "radio", "two way radio"]
        }, {
            "title": "fa-solid fa-mailbox",
            "searchTerms": ["archive", "closed", "closed mailbox with lowered flag", "envelope", "letter", "lowered", "mail", "mailbox", "newsletter", "offer", "post office", "postal", "postbox", "postcard", "send", "stamp", "usps"]
        }, {
            "title": "fa-solid fa-voicemail",
            "searchTerms": ["answer", "inbox", "message", "phone"]
        }, {
            "title": "fa-solid fa-microphone-slash",
            "searchTerms": ["audio", "disable", "disabled", "mute", "podcast", "record", "sing", "sound", "voice"]
        }, {
            "title": "fa-solid fa-microphone",
            "searchTerms": ["address", "audio", "information", "podcast", "public", "record", "sing", "sound", "talking", "voice"]
        }, {
            "title": "fa-solid fa-video-plus",
            "searchTerms": ["add", "create", "film", "new", "positive", "record", "video"]
        }, {
            "title": "fa-solid fa-tty-answer",
            "searchTerms": ["answer", "listen", "teletype"]
        }, {
            "title": "fa-solid fa-tower-cell",
            "searchTerms": ["airwaves", "antenna", "communication", "radio", "reception", "waves"]
        }, {
            "title": "fa-solid fa-symbols",
            "searchTerms": ["bolt", "category", "emoji", "heart", "image", "input", "input symbols", "music", "photo", "symbols", "〒♪&%"]
        }, {
            "title": "fa-solid fa-subtitles-slash",
            "searchTerms": ["  caption", "  film", "  language", "  movie", "  text", "  translation", " closed captions", " description", "off"]
        }, {
            "title": "fa-solid fa-subtitles",
            "searchTerms": [" caption", " description", " film", " language", " movie", " text", " translation", "closed captions"]
        }, {
            "title": "fa-solid fa-square-rss",
            "searchTerms": ["blog", "feed", "journal", "news", "writing"]
        }, {
            "title": "fa-solid fa-square-quote",
            "searchTerms": ["mention", "note", "text", "type"]
        }, {
            "title": "fa-solid fa-square-phone-hangup",
            "searchTerms": ["call", "end", "handset"]
        }, {
            "title": "fa-solid fa-square-phone-flip",
            "searchTerms": ["call", "earphone", "number", "support", "telephone", "voice"]
        }, {
            "title": "fa-solid fa-square-phone",
            "searchTerms": ["call", "earphone", "number", "support", "telephone", "voice"]
        }, {
            "title": "fa-solid fa-square-envelope",
            "searchTerms": ["e-mail", "email", "letter", "mail", "message", "notification", "offer", "support"]
        }, {
            "title": "fa-solid fa-right-left-large",
            "searchTerms": [" demand", " left", " pull", " push", " right", " share", " transfer", "direction", "supply"]
        }, {
            "title": "fa-solid fa-phone-xmark",
            "searchTerms": ["call", "end", "hangup", "phone"]
        }, {
            "title": "fa-solid fa-phone-slash",
            "searchTerms": ["call", "cancel", "disabled", "disconnect", "earphone", "mute", "number", "support", "telephone", "voice"]
        }, {
            "title": "fa-solid fa-phone-plus",
            "searchTerms": ["add", "call", "earphone", "number", "positive", "support", "telephone", "voice"]
        }, {
            "title": "fa-solid fa-phone-missed",
            "searchTerms": ["call", "rebound"]
        }, {
            "title": "fa-solid fa-phone-intercom",
            "searchTerms": ["call", "phone", "warning"]
        }, {
            "title": "fa-solid fa-phone-hangup",
            "searchTerms": ["end", "phone", "reject"]
        }, {
            "title": "fa-solid fa-phone-flip",
            "searchTerms": ["Right Hand Telephone Receiver", "call", "earphone", "number", "support", "telephone", "voice"]
        }, {
            "title": "fa-solid fa-phone-arrow-up-right",
            "searchTerms": ["call", "outgoing", "send", "upgrade"]
        }, {
            "title": "fa-solid fa-phone-arrow-right",
            "searchTerms": ["answer", "call", "forward", "next", "reply", "send", "telephone"]
        }, {
            "title": "fa-solid fa-phone-arrow-down-left",
            "searchTerms": ["answer", "incoming"]
        }, {
            "title": "fa-solid fa-paper-plane-top",
            "searchTerms": ["email", "fold", "send"]
        }, {
            "title": "fa-solid fa-mobile-screen-button",
            "searchTerms": ["apple", "call", "cell phone", "device", "iphone", "number", "screen", "telephone"]
        }, {
            "title": "fa-solid fa-mobile-screen",
            "searchTerms": ["android", "call", "cell phone", "device", "number", "screen", "telephone", "text"]
        }, {
            "title": "fa-solid fa-mobile-retro",
            "searchTerms": ["cellphone", "cellular", "phone"]
        }, {
            "title": "fa-solid fa-mobile-notch",
            "searchTerms": ["display", "iPhone X", "iphone", "smartphone"]
        }, {
            "title": "fa-solid fa-mobile-button",
            "searchTerms": ["apple", "call", "cell phone", "device", "iphone", "number", "screen", "telephone"]
        }, {
            "title": "fa-solid fa-microphone-lines-slash",
            "searchTerms": ["audio", "disable", "disabled", "disconnect", "disconnect", "mute", "podcast", "record", "sing", "sound", "voice"]
        }, {
            "title": "fa-solid fa-microphone-lines",
            "searchTerms": ["audio", "mic", "microphone", "music", "podcast", "record", "sing", "sound", "studio", "studio microphone", "talking", "voice"]
        }, {
            "title": "fa-solid fa-messages-question",
            "searchTerms": ["chat", "faq", "help", "question", "request", "support"]
        }, {
            "title": "fa-solid fa-messages",
            "searchTerms": [" conversation", " discussion", " talking", "answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "talk", "texting"]
        }, {
            "title": "fa-solid fa-message-xmark",
            "searchTerms": ["answer", "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "uncheck", "x"]
        }, {
            "title": "fa-solid fa-message-text",
            "searchTerms": ["answer", "contact", "font", "text", "type"]
        }, {
            "title": "fa-solid fa-message-sms",
            "searchTerms": ["chat"]
        }, {
            "title": "fa-solid fa-message-smile",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-slash",
            "searchTerms": ["answer", "bubble", "cancel", "chat", "commenting", "conversation", "disabled", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-quote",
            "searchTerms": ["answer", "chat", "quote"]
        }, {
            "title": "fa-solid fa-message-question",
            "searchTerms": ["chat", "faq", "help", "question", "support"]
        }, {
            "title": "fa-solid fa-message-plus",
            "searchTerms": ["add", "answer", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-pen",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "modify", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write"]
        }, {
            "title": "fa-solid fa-message-minus",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-middle-top",
            "searchTerms": [" conversation", " discussion", " talking", "answer", "contact", "conversation", "sms", "talk"]
        }, {
            "title": "fa-solid fa-message-middle",
            "searchTerms": ["answer", "contact", "conversation", "sms"]
        }, {
            "title": "fa-solid fa-message-medical",
            "searchTerms": ["advice", "answer", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-lines",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-image",
            "searchTerms": ["answer", "chat", "discussion", "img", "photography", "photos"]
        }, {
            "title": "fa-solid fa-message-heart",
            "searchTerms": ["bubble", "comment", "favorite", "happy", "love"]
        }, {
            "title": "fa-solid fa-message-exclamation",
            "searchTerms": ["alert", "answer", "attention", "bubble", "chat", "commenting", "conversation", "error", "exclaim", "failed", "feedback", "important", "message", "note", "notification", "request", "required", "sms", "speech", "surprise", "texting", "warning"]
        }, {
            "title": "fa-solid fa-message-dots",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "request", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-message-code",
            "searchTerms": ["coding", "contact", "discussion"]
        }, {
            "title": "fa-solid fa-message-check",
            "searchTerms": ["accept", "agree", "answer", "bubble", "chat", "commenting", "conversation", "enable", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo", "validate", "working"]
        }, {
            "title": "fa-solid fa-message-bot",
            "searchTerms": ["ai", "answer", "automated", "chat", "chatbot", "comment", "help", "support"]
        }, {
            "title": "fa-solid fa-message-arrow-up-right",
            "searchTerms": ["chat", "contact", "discussion", "send", "upload"]
        }, {
            "title": "fa-solid fa-message-arrow-up",
            "searchTerms": ["answer", "chat", "contact", "discussion", "send", "upgrade", "upload"]
        }, {
            "title": "fa-solid fa-message-arrow-down",
            "searchTerms": ["answer", "chat", "contact", "download", "insert"]
        }, {
            "title": "fa-solid fa-message",
            "searchTerms": [" conversation", " discussion", " talking", "answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "talk", "texting"]
        }, {
            "title": "fa-solid fa-mailbox-flag-up",
            "searchTerms": ["archive", "envelope", "letter", "mail", "mailbox", "open", "open mailbox with raised flag", "post office", "postal", "postbox", "postcard", "raised", "send", "stamp", "usps"]
        }, {
            "title": "fa-solid fa-inbox-out",
            "searchTerms": ["archive", "box", "desk", "email", "letter", "mail", "message", "newsletter", "offer", "outbox", "outbox tray", "sent", "tray", "upgrade"]
        }, {
            "title": "fa-solid fa-inbox-in",
            "searchTerms": ["archive", "box", "desk", "email", "inbox", "inbox tray", "insert", "letter", "mail", "message", "newsletter", "offer", "receive", "tray"]
        }, {
            "title": "fa-solid fa-hundred-points",
            "searchTerms": ["100", "agree", "one hundred", "percent", "perfect score", "win"]
        }, {
            "title": "fa-solid fa-hands-asl-interpreting",
            "searchTerms": ["asl", "deaf", "finger", "hand", "interpret", "speak"]
        }, {
            "title": "fa-solid fa-fax",
            "searchTerms": ["Fax Icon", "business", "communicate", "copy", "facsimile", "fax", "fax machine", "send"]
        }, {
            "title": "fa-solid fa-face-smile-plus",
            "searchTerms": ["add", "emoticon", "face", "follow", "happy", "new"]
        }, {
            "title": "fa-solid fa-face-meh",
            "searchTerms": ["deadpan", "default", "emoticon", "face", "meh", "neutral", "neutral face", "rating", "uer"]
        }, {
            "title": "fa-solid fa-face-frown",
            "searchTerms": ["disapprove", "emoticon", "face", "frown", "frowning face", "rating", "sad", "uer"]
        }, {
            "title": "fa-solid fa-envelope-open",
            "searchTerms": ["e-mail", "email", "letter", "mail", "message", "newsletter", "notification", "offer", "support"]
        }, {
            "title": "fa-solid fa-envelope-dot",
            "searchTerms": ["email"]
        }, {
            "title": "fa-solid fa-envelope-circle-check",
            "searchTerms": ["check", "email", "enable", "envelope", "mail", "not affected", "ok", "okay", "read", "sent", "validate", "working"]
        }, {
            "title": "fa-solid fa-ear-listen",
            "searchTerms": ["amplify", "audio", "deaf", "ear", "headset", "hearing", "sound"]
        }, {
            "title": "fa-solid fa-crystal-ball",
            "searchTerms": ["ball", "crystal", "crystal ball", "fairy tale", "fantasy", "fortune", "future", "glass", "globe", "tool"]
        }, {
            "title": "fa-solid fa-comments-question-check",
            "searchTerms": ["answer", "chat", "enable", "faq", "help", "question", "request", "support", "validate", "working"]
        }, {
            "title": "fa-solid fa-comments-question",
            "searchTerms": ["answer", "chat", "faq", "help", "question", "request", "support"]
        }, {
            "title": "fa-solid fa-comment-xmark",
            "searchTerms": ["answer", "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "uncheck", "x"]
        }, {
            "title": "fa-solid fa-comment-text",
            "searchTerms": ["answer", "chat", "font", "type"]
        }, {
            "title": "fa-solid fa-comment-sms",
            "searchTerms": ["answer", "chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting"]
        }, {
            "title": "fa-solid fa-comment-smile",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-comment-slash",
            "searchTerms": ["answer", "bubble", "cancel", "chat", "commenting", "conversation", "disabled", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-comment-quote",
            "searchTerms": ["answer", "chat", "quote"]
        }, {
            "title": "fa-solid fa-comment-question",
            "searchTerms": ["answer", "chat", "faq", "help", "question", "request", "support"]
        }, {
            "title": "fa-solid fa-comment-plus",
            "searchTerms": ["add", "answer", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-comment-pen",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "modify", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write"]
        }, {
            "title": "fa-solid fa-comment-music",
            "searchTerms": ["answer", "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting"]
        }, {
            "title": "fa-solid fa-comment-minus",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-comment-middle-top",
            "searchTerms": ["answer", "chat", "conversation"]
        }, {
            "title": "fa-solid fa-comment-middle",
            "searchTerms": ["answer", "chat", "conversation"]
        }, {
            "title": "fa-solid fa-comment-medical",
            "searchTerms": ["advice", "answer", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-comment-lines",
            "searchTerms": ["answer", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting"]
        }, {
            "title": "fa-solid fa-comment-image",
            "searchTerms": ["answer", "chat", "discussion", "photography", "photos"]
        }, {
            "title": "fa-solid fa-comment-heart",
            "searchTerms": ["bubble", "favorite", "happy", "love", "message"]
        }, {
            "title": "fa-solid fa-comment-exclamation",
            "searchTerms": ["alert", "answer", "attention", "bubble", "chat", "commenting", "conversation", "exclaim", "failed", "feedback", "important", "message", "note", "notification", "request", "sms", "speech", "surprise", "texting"]
        }, {
            "title": "fa-solid fa-comment-dots",
            "searchTerms": ["answer", "balloon", "bubble", "chat", "comic", "commenting", "conversation", "dialog", "feedback", "message", "more", "note", "notification", "reply", "request", "sms", "speech", "speech balloon", "texting"]
        }, {
            "title": "fa-solid fa-comment-code",
            "searchTerms": ["answer", "coding", "contact", "discussion"]
        }, {
            "title": "fa-solid fa-comment-check",
            "searchTerms": ["accept", "agree", "answer", "bubble", "chat", "commenting", "conversation", "enable", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo", "validate", "working"]
        }, {
            "title": "fa-solid fa-comment-captions",
            "searchTerms": ["answer", "chat", "closed captions", "subtitle", "subtitling"]
        }, {
            "title": "fa-solid fa-comment-arrow-up-right",
            "searchTerms": ["answer", "chat", "contact", "discussion", "send", "upload"]
        }, {
            "title": "fa-solid fa-comment-arrow-up",
            "searchTerms": ["answer", "chat", "contact", "discussion", "send", "upgrade", "upload"]
        }, {
            "title": "fa-solid fa-comment-arrow-down",
            "searchTerms": ["answer", "chat", "contact", "download", "insert"]
        }, {
            "title": "fa-solid fa-circle-phone-hangup",
            "searchTerms": ["answer", "call", "handset", "telephone"]
        }, {
            "title": "fa-solid fa-circle-phone-flip",
            "searchTerms": ["answer", "call", "handset", "telephone"]
        }, {
            "title": "fa-solid fa-circle-phone",
            "searchTerms": ["answer", "call", "handset", "telephone"]
        }, {
            "title": "fa-solid fa-circle-envelope",
            "searchTerms": ["email", "message", "send"]
        }, {
            "title": "fa-solid fa-bullhorn",
            "searchTerms": ["Bullhorn", "announcement", "broadcast", "loud", "louder", "loudspeaker", "megaphone", "public address", "request", "share"]
        }, {
            "title": "fa-solid fa-blender-phone",
            "searchTerms": ["appliance", "cocktail", "fantasy", "milkshake", "mixer", "puree", "silly", "smoothie"]
        }, {
            "title": "fa-solid fa-at",
            "searchTerms": ["Commercial At", "address", "author", "e-mail", "email", "fluctuate", "handle"]
        }, {
            "title": "fa-solid fa-pen-nib",
            "searchTerms": ["design", "edit", "fountain pen", "modify", "update", "write"]
        }, {
            "title": "fa-solid fa-calendar-days",
            "searchTerms": ["calendar", "date", "day", "event", "month", "schedule", "time", "when", "year"]
        }, {
            "title": "fa-solid fa-paperclip",
            "searchTerms": ["attach", "attachment", "connect", "link", "papercli", "paperclip"]
        }, {
            "title": "fa-solid fa-file",
            "searchTerms": ["Empty Document", "cv", "document", "new", "page", "page facing up", "pdf", "resume"]
        }, {
            "title": "fa-solid fa-clipboard",
            "searchTerms": ["clipboar", "clipboard", "copy", "notepad", "notes", "paste", "record"]
        }, {
            "title": "fa-solid fa-pen",
            "searchTerms": ["ballpoint", "design", "edit", "modify", "pen", "update", "write"]
        }, {
            "title": "fa-solid fa-tag",
            "searchTerms": ["discount", "labe", "label", "price", "shopping"]
        }, {
            "title": "fa-solid fa-book",
            "searchTerms": ["book", "cover", "decorated", "diary", "documentation", "journal", "knowledge", "library", "notebook", "notebook with decorative cover", "read", "research", "scholar"]
        }, {
            "title": "fa-solid fa-print",
            "searchTerms": ["Print Screen Symbol", "Printer Icon", "business", "computer", "copy", "document", "office", "paper", "printer"]
        }, {
            "title": "fa-solid fa-pen-to-square",
            "searchTerms": ["edit", "modify", "pen", "pencil", "update", "write"]
        }, {
            "title": "fa-solid fa-folder",
            "searchTerms": ["Black Folder", "archive", "directory", "document", "file", "file folder", "folder"]
        }, {
            "title": "fa-solid fa-folder-open",
            "searchTerms": ["Open Folder", "archive", "directory", "document", "empty", "file", "folder", "new", "open", "open file folder"]
        }, {
            "title": "fa-solid fa-thumbtack",
            "searchTerms": ["Black Pushpin", "coordinates", "location", "marker", "pin", "pushpin", "thumb-tack"]
        }, {
            "title": "fa-solid fa-globe",
            "searchTerms": ["all", "coordinates", "country", "earth", "global", "globe", "globe with meridians", "gps", "internet", "language", "localize", "location", "map", "meridians", "network", "online", "place", "planet", "translate", "travel", "world", "www"]
        }, {
            "title": "fa-solid fa-city",
            "searchTerms": ["buildings", "busy", "city", "cityscape", "skyscrapers", "urban", "windows"]
        }, {
            "title": "fa-solid fa-briefcase",
            "searchTerms": ["bag", "briefcas", "briefcase", "business", "luggage", "offer", "office", "portfolio", "work"]
        }, {
            "title": "fa-solid fa-compass",
            "searchTerms": ["compass", "directions", "directory", "location", "magnetic", "menu", "navigation", "orienteering", "safari", "travel"]
        }, {
            "title": "fa-solid fa-business-time",
            "searchTerms": ["alarm", "briefcase", "business socks", "clock", "flight of the conchords", "portfolio", "reminder", "wednesday"]
        }, {
            "title": "fa-solid fa-computer-classic",
            "searchTerms": ["apple II", "hardware", "machine", "macintosh", "programming", "retro", "vintage"]
        }, {
            "title": "fa-solid fa-pen-fancy",
            "searchTerms": ["black nib", "design", "edit", "fountain", "fountain pen", "modify", "nib", "pen", "update", "write"]
        }, {
            "title": "fa-solid fa-badge-check",
            "searchTerms": ["accept", "achievement", "agree", "award", "confirm", "correct", "done", "enable", "guarantee", "ok", "security", "select", "success", "validate", "verified", "verify", "warranty", "winner", "working", "yes"]
        }, {
            "title": "fa-solid fa-mug-saucer",
            "searchTerms": ["beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea"]
        }, {
            "title": "fa-solid fa-landmark",
            "searchTerms": ["building", "classical", "historic", "memorable", "monument", "museum", "politics", "society"]
        }, {
            "title": "fa-solid fa-chart-simple",
            "searchTerms": ["analytics", "bar", "chart", "column", "graph", "performance", "revenue", "row", "statistics", "trend"]
        }, {
            "title": "fa-solid fa-diagram-venn",
            "searchTerms": ["chart", "intersection", "logic", "overlap"]
        }, {
            "title": "fa-solid fa-calendar",
            "searchTerms": ["calendar", "calendar-o", "date", "day", "event", "month", "schedule", "tear-off calendar", "time", "when", "year"]
        }, {
            "title": "fa-solid fa-pencil",
            "searchTerms": ["Lower Left Pencil", "design", "draw", "edit", "lead", "maintenance", "modify", "pencil", "update", "write"]
        }, {
            "title": "fa-solid fa-copy",
            "searchTerms": ["clone", "duplicate", "file", "files-o", "paper", "paste"]
        }, {
            "title": "fa-solid fa-table",
            "searchTerms": ["category", "data", "excel", "spreadsheet"]
        }, {
            "title": "fa-solid fa-building",
            "searchTerms": ["apartment", "building", "business", "city", "company", "office", "office building", "urban", "work"]
        }, {
            "title": "fa-solid fa-network-wired",
            "searchTerms": ["computer", "connect", "ethernet", "internet", "intranet"]
        }, {
            "title": "fa-solid fa-tags",
            "searchTerms": ["discount", "label", "price", "shopping"]
        }, {
            "title": "fa-solid fa-registered",
            "searchTerms": ["copyright", "mark", "r", "registered", "trademark"]
        }, {
            "title": "fa-solid fa-signature",
            "searchTerms": ["John Hancock", "cursive", "name", "username", "writing"]
        }, {
            "title": "fa-solid fa-phone-office",
            "searchTerms": ["call", "earphone", "number", "support", "telephone", "voice"]
        }, {
            "title": "fa-solid fa-projector",
            "searchTerms": ["cinema", "keynote", "movie", "powerpoint", "presentation", "shadow puppets", "slides"]
        }, {
            "title": "fa-solid fa-sitemap",
            "searchTerms": ["directory", "hierarchy", "ia", "information architecture", "organization"]
        }, {
            "title": "fa-solid fa-marker",
            "searchTerms": ["design", "edit", "modify", "sharpie", "update", "write"]
        }, {
            "title": "fa-solid fa-badge",
            "searchTerms": ["discount", "guarantee", "meatball", "verified", "verify"]
        }, {
            "title": "fa-solid fa-wallet",
            "searchTerms": ["billfold", "cash", "currency", "money", "salary"]
        }, {
            "title": "fa-solid fa-copyright",
            "searchTerms": ["brand", "c", "copyright", "mark", "register", "trademark"]
        }, {
            "title": "fa-solid fa-bullseye",
            "searchTerms": ["archery", "goal", "objective", "strategy", "target"]
        }, {
            "title": "fa-solid fa-calculator",
            "searchTerms": ["Pocket Calculator", "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction"]
        }, {
            "title": "fa-solid fa-certificate",
            "searchTerms": ["badge", "guarantee", "star", "verified"]
        }, {
            "title": "fa-solid fa-percent",
            "searchTerms": ["Percent Sign", "discount", "fraction", "proportion", "rate", "ratio"]
        }, {
            "title": "fa-solid fa-eraser",
            "searchTerms": ["art", "delete", "remove", "rubber"]
        }, {
            "title": "fa-solid fa-file-spreadsheet",
            "searchTerms": ["csv", "document", "excel", "numbers", "sheets", "xls"]
        }, {
            "title": "fa-solid fa-glasses",
            "searchTerms": ["hipster", "nerd", "reading", "sight", "spectacles", "vision"]
        }, {
            "title": "fa-solid fa-industry",
            "searchTerms": ["building", "factory", "industrial", "manufacturing", "mill", "warehouse"]
        }, {
            "title": "fa-solid fa-vault",
            "searchTerms": ["bank", "important", "investment", "lock", "money", "premium", "privacy", "safe", "salary"]
        }, {
            "title": "fa-solid fa-user-tie-hair-long",
            "searchTerms": ["administrator", "avatar", "business", "clothing", "employee", "formal", "professional", "suit", "uer"]
        }, {
            "title": "fa-solid fa-user-tie-hair",
            "searchTerms": ["administrator", "avatar", "business", "clothing", "employee", "formal", "professional", "suit", "uer"]
        }, {
            "title": "fa-solid fa-user-hair-mullet",
            "searchTerms": ["business", "mullet", "party", "uer"]
        }, {
            "title": "fa-solid fa-trademark",
            "searchTerms": ["copyright", "mark", "register", "symbol", "tm", "trade mark", "trademark"]
        }, {
            "title": "fa-solid fa-timeline-arrow",
            "searchTerms": ["chronological", "deadline", "history", "linear"]
        }, {
            "title": "fa-solid fa-timeline",
            "searchTerms": ["chronological", "deadline", "history", "linear"]
        }, {
            "title": "fa-solid fa-table-tree",
            "searchTerms": ["directory", "file", "folder", "structure"]
        }, {
            "title": "fa-solid fa-table-rows",
            "searchTerms": ["cell", "spreadsheet", "table"]
        }, {
            "title": "fa-solid fa-table-pivot",
            "searchTerms": ["cell", "flip", "layout", "rotate", "row", "table"]
        }, {
            "title": "fa-solid fa-table-layout",
            "searchTerms": ["category", "cell", "column", "layout", "row", "spreadsheet"]
        }, {
            "title": "fa-solid fa-table-columns",
            "searchTerms": ["browser", "category", "dashboard", "organize", "panes", "split"]
        }, {
            "title": "fa-solid fa-stapler",
            "searchTerms": ["desktop", "milton", "office", "paperclip", "staple"]
        }, {
            "title": "fa-solid fa-square-poll-vertical",
            "searchTerms": ["chart", "graph", "results", "revenue", "statistics", "survey", "trend", "vote", "voting"]
        }, {
            "title": "fa-solid fa-square-poll-horizontal",
            "searchTerms": ["chart", "graph", "results", "statistics", "survey", "trend", "vote", "voting"]
        }, {
            "title": "fa-solid fa-square-pen",
            "searchTerms": ["edit", "modify", "pencil-square", "update", "write"]
        }, {
            "title": "fa-solid fa-square-kanban",
            "searchTerms": ["board", "chart", "graph", "kanban", "list", "organize", "project", "statistics"]
        }, {
            "title": "fa-solid fa-socks",
            "searchTerms": ["business socks", "business time", "clothing", "feet", "flight of the conchords", "socks", "stocking", "wednesday"]
        }, {
            "title": "fa-solid fa-slot-machine",
            "searchTerms": ["gamble", "gambling", "game", "lucky", "slot", "slot machine", "vegas"]
        }, {
            "title": "fa-solid fa-signature-slash",
            "searchTerms": ["disabled", "signature", "unverified", "username"]
        }, {
            "title": "fa-solid fa-signature-lock",
            "searchTerms": ["key signature", "lock", "padlock", "privacy", "private", "signature", "username", "verified"]
        }, {
            "title": "fa-solid fa-shredder",
            "searchTerms": ["destroy", "document", "office", "paper", "print"]
        }, {
            "title": "fa-solid fa-scissors",
            "searchTerms": ["Black Safety Scissors", "White Scissors", "clip", "cutting", "equipment", "modify", "scissors", "snip", "tool"]
        }, {
            "title": "fa-solid fa-scanner-image",
            "searchTerms": ["copy", "device", "digitize", "image", "img", "import"]
        }, {
            "title": "fa-solid fa-scale-unbalanced-flip",
            "searchTerms": ["justice", "legal", "measure", "unbalanced", "weight"]
        }, {
            "title": "fa-solid fa-scale-unbalanced",
            "searchTerms": ["justice", "legal", "measure", "unbalanced", "weight"]
        }, {
            "title": "fa-solid fa-scale-balanced",
            "searchTerms": ["Libra", "balance", "balance scale", "balanced", "justice", "law", "legal", "measure", "rule", "scale", "weight", "zodiac"]
        }, {
            "title": "fa-solid fa-router",
            "searchTerms": ["bandwidth", "connection", "dsl", "ethernet", "internet", "modem", "switch", "wifi", "wireless", "www"]
        }, {
            "title": "fa-solid fa-rectangle-pro",
            "searchTerms": ["professional"]
        }, {
            "title": "fa-solid fa-print-slash",
            "searchTerms": ["business", "copy", "disabled", "document", "office", "offline", "paper"]
        }, {
            "title": "fa-solid fa-print-magnifying-glass",
            "searchTerms": ["business", "copy", "document", "find", "magnifier", "office", "paper", "search"]
        }, {
            "title": "fa-solid fa-presentation-screen",
            "searchTerms": ["keynote", "lecture", "panel", "powerpoint", "ppt", "seminar", "slides", "speak", "speaker", "talk"]
        }, {
            "title": "fa-solid fa-podium",
            "searchTerms": ["debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk"]
        }, {
            "title": "fa-solid fa-person-chalkboard",
            "searchTerms": ["blackboard", "instructor", "keynote", "lesson", "presentation", "teacher", "uer"]
        }, {
            "title": "fa-solid fa-pen-nib-slash",
            "searchTerms": ["design", "disabled", "edit", "fountain pen", "modify", "update", "write"]
        }, {
            "title": "fa-solid fa-pen-clip",
            "searchTerms": ["design", "edit", "modify", "update", "write"]
        }, {
            "title": "fa-solid fa-paste",
            "searchTerms": ["clipboard", "copy", "document", "paper"]
        }, {
            "title": "fa-solid fa-paperclip-vertical",
            "searchTerms": ["attach", "attachment", "connect", "link"]
        }, {
            "title": "fa-solid fa-notebook",
            "searchTerms": ["daybook", "diary", "journal", "noteboo", "notebook", "notepad", "sketch"]
        }, {
            "title": "fa-solid fa-note-sticky",
            "searchTerms": ["message", "note", "paper", "reminder", "sticker"]
        }, {
            "title": "fa-solid fa-money-check-pen",
            "searchTerms": ["bank check", "buy", "checkout", "cheque", "modify", "money", "payment", "pen", "price", "purchase", "salary"]
        }, {
            "title": "fa-solid fa-money-check-dollar-pen",
            "searchTerms": ["bank check", "buy", "checkout", "cheque", "modify", "money", "payment", "pen", "price", "purchase", "salary"]
        }, {
            "title": "fa-solid fa-magnifying-glass-chart",
            "searchTerms": [" data", " graph", " intelligence", "analysis", "chart", "magnifier", "market", "revenue"]
        }, {
            "title": "fa-solid fa-magnifying-glass-arrow-right",
            "searchTerms": ["find", "magnifier", "next", "search"]
        }, {
            "title": "fa-solid fa-list-tree",
            "searchTerms": ["cheatsheet", "directory", "file", "summary", "tree"]
        }, {
            "title": "fa-solid fa-list-timeline",
            "searchTerms": ["cheatsheet", "chronological", "deadline", "history", "linear", "summary"]
        }, {
            "title": "fa-solid fa-list-radio",
            "searchTerms": ["cheatsheet", "list", "order", "selection", "summary"]
        }, {
            "title": "fa-solid fa-list-dropdown",
            "searchTerms": ["cheatsheet", "menu", "summary", "wishlist"]
        }, {
            "title": "fa-solid fa-list-check",
            "searchTerms": ["bullet", "cheatsheet", "checklist", "downloading", "downloads", "enable", "loading", "progress", "project management", "settings", "summary", "to do", "validate", "working"]
        }, {
            "title": "fa-solid fa-laptop-file",
            "searchTerms": ["computer", "education", "laptop", "learning", "remote work"]
        }, {
            "title": "fa-solid fa-laptop-binary",
            "searchTerms": [" binary", " code", " cpu", " dell", " demo", " develop", " device", " information", " mac", " macbook", " machine", " pc", "computer"]
        }, {
            "title": "fa-solid fa-lamp-desk",
            "searchTerms": ["bright", "furniture", "light"]
        }, {
            "title": "fa-solid fa-keynote",
            "searchTerms": ["lecture", "panel", "seminar", "speak", "speaker", "talk"]
        }, {
            "title": "fa-solid fa-industry-windows",
            "searchTerms": ["building", "factory", "industrial", "manufacturing", "mill", "warehouse"]
        }, {
            "title": "fa-solid fa-inboxes",
            "searchTerms": ["communication", "dropbox", "email", "incoming", "organize", "outgoing", "send"]
        }, {
            "title": "fa-solid fa-inbox-full",
            "searchTerms": ["communication", "dropbox", "email", "incoming", "organize", "outgoing", "send"]
        }, {
            "title": "fa-solid fa-house-laptop",
            "searchTerms": ["computer", "covid-19", "device", "office", "remote", "work from home"]
        }, {
            "title": "fa-solid fa-highlighter",
            "searchTerms": ["edit", "marker", "modify", "sharpie", "update", "write"]
        }, {
            "title": "fa-solid fa-folders",
            "searchTerms": ["archive", "copy", "directory", "document", "duplicate", "file"]
        }, {
            "title": "fa-solid fa-folder-xmark",
            "searchTerms": ["archive", "delete", "directory", "document", "file", "remove", "uncheck", "x"]
        }, {
            "title": "fa-solid fa-folder-tree",
            "searchTerms": ["archive", "directory", "document", "file", "search", "structure"]
        }, {
            "title": "fa-solid fa-folder-plus",
            "searchTerms": ["add", "archive", "create", "directory", "document", "file", "new", "positive"]
        }, {
            "title": "fa-solid fa-folder-minus",
            "searchTerms": ["archive", "delete", "directory", "document", "file", "negative", "remove"]
        }, {
            "title": "fa-solid fa-folder-arrow-up",
            "searchTerms": ["archive", "directory", "document", "file", "save", "upgrade", "upload"]
        }, {
            "title": "fa-solid fa-folder-arrow-down",
            "searchTerms": ["archive", "directory", "document", "download", "file", "insert", "save"]
        }, {
            "title": "fa-solid fa-floppy-disk-circle-xmark",
            "searchTerms": ["disk", "download", "floppy", "floppy-o", "uncheck"]
        }, {
            "title": "fa-solid fa-floppy-disk-circle-arrow-right",
            "searchTerms": ["disk", "download", "floppy", "floppy-o"]
        }, {
            "title": "fa-solid fa-floppy-disk",
            "searchTerms": ["Black Hard Shell Floppy Disk", "computer", "disk", "download", "floppy", "floppy disk", "floppy-o"]
        }, {
            "title": "fa-solid fa-file-user",
            "searchTerms": ["account", "cv", "document", "employee", "page", "personnel", "profile", "resume", "uer"]
        }, {
            "title": "fa-solid fa-file-lines",
            "searchTerms": ["Document", "Document with Text", "document", "file-text", "invoice", "new", "page", "pdf"]
        }, {
            "title": "fa-solid fa-file-circle-plus",
            "searchTerms": ["add", "document", "file", "new", "page", "paper", "pdf"]
        }, {
            "title": "fa-solid fa-file-circle-info",
            "searchTerms": ["details", "document", "info", "new", "page", "pdf"]
        }, {
            "title": "fa-solid fa-file-chart-pie",
            "searchTerms": ["analytics", "data", "document", "projection", "report", "revenue"]
        }, {
            "title": "fa-solid fa-file-chart-column",
            "searchTerms": ["analytics", "data", "document", "projection", "report", "revenue"]
        }, {
            "title": "fa-solid fa-coffee-pot",
            "searchTerms": ["beverage", "breakfast", "brew", "cafe", "carafe", "drink", "morning"]
        }, {
            "title": "fa-solid fa-cloud-word",
            "searchTerms": ["captions", "ideas", "subtitle", "subtitling"]
        }, {
            "title": "fa-solid fa-clipboard-question",
            "searchTerms": ["assistance", "faq", "interview", "query", "question"]
        }, {
            "title": "fa-solid fa-chart-user",
            "searchTerms": ["employee", "performance", "revenue", "uer", "users-people"]
        }, {
            "title": "fa-solid fa-chart-tree-map",
            "searchTerms": ["collection", "grid", "performance"]
        }, {
            "title": "fa-solid fa-chart-simple-horizontal",
            "searchTerms": ["analytics", "bar", "chart", "column", "graph", "performance", "row", "statistics", "trend"]
        }, {
            "title": "fa-solid fa-chart-pyramid",
            "searchTerms": ["chart", "food", "graph", "performance", "statistics"]
        }, {
            "title": "fa-solid fa-chart-pie-simple-circle-dollar",
            "searchTerms": [" chart", " currency", " diagram", " graph", " margin", " money", " pie", "analytics"]
        }, {
            "title": "fa-solid fa-chart-pie-simple-circle-currency",
            "searchTerms": [" chart", " currency", " diagram", " graph", " margin", " money", " pie", "analytics"]
        }, {
            "title": "fa-solid fa-chart-pie-simple",
            "searchTerms": ["analytics", "chart", "diagram", "graph", "performance", "pie", "revenue", "statistics"]
        }, {
            "title": "fa-solid fa-chart-pie",
            "searchTerms": ["analytics", "chart", "diagram", "graph", "performance", "pie", "revenue", "statistics"]
        }, {
            "title": "fa-solid fa-chart-line-up-down",
            "searchTerms": [" chart increasing", " decreasing", " down", " graph", " growth", " track", " trend", " upward", " volatility", "chart"]
        }, {
            "title": "fa-solid fa-chart-line-up",
            "searchTerms": ["chart", "chart increasing", "graph", "growth", "performance", "revenue", "statistics", "track", "trend", "upward"]
        }, {
            "title": "fa-solid fa-chart-line-down",
            "searchTerms": ["analytics", "chart", "chart decreasing", "dashboard", "decline", "down", "graph", "line", "loss", "performance", "revenue", "statistics", "trend"]
        }, {
            "title": "fa-solid fa-chart-line",
            "searchTerms": ["activity", "analytics", "chart", "dashboard", "gain", "graph", "increase", "line", "performance", "revenue", "statistics"]
        }, {
            "title": "fa-solid fa-cake-candles",
            "searchTerms": ["anniversary", "bakery", "birthday", "birthday cake", "cake", "candles", "celebration", "dessert", "frosting", "holiday", "party", "pastry", "sweet"]
        }, {
            "title": "fa-solid fa-cabinet-filing",
            "searchTerms": ["archive", "cabinet", "file", "file cabinet", "files", "filing", "records", "register", "storage"]
        }, {
            "title": "fa-solid fa-briefcase-blank",
            "searchTerms": ["bag", "business", "luggage", "offer", "office", "portfolio", "work"]
        }, {
            "title": "fa-solid fa-briefcase-arrow-right",
            "searchTerms": ["suitcase", "tomorrow", "travel"]
        }, {
            "title": "fa-solid fa-brain-arrow-curved-right",
            "searchTerms": ["brain", "brainstorming", "meeting", "planning"]
        }, {
            "title": "fa-solid fa-boxes-packing",
            "searchTerms": ["archive", "box", "package", "storage", "supplies"]
        }, {
            "title": "fa-solid fa-box-archive",
            "searchTerms": ["box", "package", "save", "storage"]
        }, {
            "title": "fa-solid fa-book-section",
            "searchTerms": ["law", "legal", "library", "research", "silcrow"]
        }, {
            "title": "fa-solid fa-bars-staggered",
            "searchTerms": ["flow", "list", "timeline"]
        }, {
            "title": "fa-solid fa-bars-progress",
            "searchTerms": ["checklist", "downloading", "downloads", "loading", "poll", "progress", "project management", "settings", "to do"]
        }, {
            "title": "fa-solid fa-badge-percent",
            "searchTerms": ["coupon", "deal", "discount", "guarantee", "investment", "money", "salary", "save", "usd"]
        }, {
            "title": "fa-solid fa-badge-dollar",
            "searchTerms": ["coupon", "deal", "discount", "guarantee", "investment", "money", "salary", "save", "usd"]
        }, {
            "title": "fa-solid fa-arrows-to-eye",
            "searchTerms": ["center", "coordinated assessment", "focus"]
        }, {
            "title": "fa-solid fa-arrows-to-dot",
            "searchTerms": ["assembly point", "center", "condense", "focus", "insert", "minimize"]
        }, {
            "title": "fa-solid fa-arrows-spin",
            "searchTerms": ["cycle", "rotate", "spin", "whirl"]
        }, {
            "title": "fa-solid fa-arrow-progress",
            "searchTerms": [" flow", " methodology", " process", " progress", " steps", "route"]
        }],
        hideOnSelect: true,
        fullClassFormatter: function(val) {
            return val;
        },
        templates: {
            search: '<input type="text" class="form-control iconpicker-search" placeholder="' + __('Search') + '..." />',
        }
    }
}