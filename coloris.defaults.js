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

window.APP.VENDORS.DEFAULTS.coloris = {
    default: {
        alpha: false,
        clearButton: true,
        clearLabel: __("Clear"),
        swatches: [
            '#AA47BD',
            '#ED407A',
            '#0388D2',
            '#00897B',
            '#FAAA33',
            '#79929C',
            '#68A039',
            '#8C6E63',
            '#7D57C1',
            '#EF6C02',
            '#BE360B',
            '#502CA8',
            '#004D40',
            '#00579B',
            '#C2185D',
            '#7B1FA2',
            '#455A65',
            '#F6511E',
            '#5D4138',
            '#336B1D',
            '#5D6AC0',
            '#0098A7',
        ],
        parent: '.coloris-wrapper',
    },
    statuses: {
        alpha: false,
        clearButton: true,
        clearLabel: __("Clear"),
        swatches: [
            "#ffffff",
            "#c0c0c0",
            "#808080",
            "#000000",
            "#000080",
            "#0000ff",
            "#008080",
            "#00ffff",
            "#008000",
            "#00ff00",
            "#7fff00",
            "#808000",
            "#ffff00",
            "#ffd700",
            "#ffa500",
            "#ff0000",
            "#800000",
            "#ff00ff",
            "#800080",
            "#4b0082",
        ],
        parent: '.coloris-wrapper',
    }
}