/*
 *  Copyright 1998-2025 by Northwoods Software Corporation. All Rights Reserved.
 */
/*
 * This is an extension and not part of the main GoJS library.
 * The source code for this is at extensionsJSM/Themes.ts.
 * Note that the API for this class may change with any version, even point releases.
 * If you intend to use an extension in production, you should copy the code to your own source directory.
 * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
 * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
 */
/* eslint comma-dangle: 'off' */

/**
 * A light theme using different colors for links and the diagram background.
 *
 * This can serve as a drop-in replacement for the {@link go.Themes.Light} theme.
 *
 * Defined as the following:
 * ```ts
 * {
 *   colors: {
 *     text: '#030712',  // Gray 950
 *     comment: '#ca8a04',  // Yellow 600
 *     link: '#4f46e5',  // Indigo 600
 *     group: '#9ca3af44',  // Gray 400, partially transparent
 *     outline: '#9ca3af',  // Gray 400
 *     selection: '#ec4899',  // Pink 500
 *     div: '#f3f4f6',  // Gray 100
 *     gridMinor: '#d1d5db',  // Gray 300
 *     gridMajor: '#9ca3af',  // Gray 400
 *     overviewBox: '#ec4899',  // Pink 500
 *     tempLink: '#0ea5e9',  // Sky 500
 *     tempPort: '#ec4899',  // Pink 500
 *     adornmentFill: '#ec4899',  // Pink 500
 *     adornmentStroke: '#831843',  // Pink 900
 *     dragSelect: '#ec4899'  // Pink 500
 *   },
 *   fonts: {
 *     normal: '10pt sans-serif',
 *     bold: 'bold 12pt sans-serif'
 *   },
 *   numbers: {
 *     group: 1,  // group strokeWidth
 *     selection: 3  // selection strokeWidth
 *   },
 *   margins: {
 *     group: new Margin(5)  // group padding
 *   },
 *   arrowheads: {
 *     toArrow: 'Standard'
 *   }
 * }
 * ```
 */
const Modern = {
    colors: {
        text: '#030712', // Gray 950
        comment: '#ca8a04', // Yellow 600
        link: '#4f46e5', // Indigo 600
        group: '#9ca3af44', // Gray 400, partially transparent
        outline: '#9ca3af', // Gray 400
        selection: '#ec4899', // Pink 500
        div: '#f3f4f6', // Gray 100
        gridMinor: '#d1d5db', // Gray 300
        gridMajor: '#9ca3af', // Gray 400
        overviewBox: '#ec4899', // Pink 500
        tempLink: '#0ea5e9', // Sky 500
        tempPort: '#ec4899', // Pink 500
        adornmentFill: '#ec4899', // Pink 500
        adornmentStroke: '#831843', // Pink 900
        dragSelect: '#ec4899', // Pink 500
    },
    fonts: {
        normal: '10pt sans-serif',
        bold: 'bold 12pt sans-serif',
    },
    numbers: {
        group: 1,
        selection: 3,
    },
    margins: {
        group: new go.Margin(5),
    },
    arrowheads: {
        toArrow: 'Standard',
    },
};
/**
 * A dark theme using different colors for links and the diagram background.
 *
 * This can serve as a drop-in replacement for the {@link go.Themes.Dark} theme.
 *
 * Defined as the following:
 * ```ts
 * {
 *   colors: {
 *     text: '#f3f4f6',  // Gray 100
 *     comment: '#facc15',  // Yellow 400
 *     link: '#818cf8',  // Indigo 400
 *     group: '#9ca3af88',  // Gray 400, partially transparent
 *     outline: '#9ca3af',  // Gray 400
 *     selection: '#f472b6',  // Pink 400
 *     div: '#111827',  // Gray 900
 *     gridMinor: '#374151',  // Gray 700
 *     gridMajor: '#4b5563',  // Gray 600
 *     overviewBox: '#f472b6',  // Pink 400
 *     tempLink: '#0ea5e9',  // Sky 500
 *     tempPort: '#f472b6',  // Pink 400
 *     adornmentFill: '#f472b6',  // Pink 400
 *     adornmentStroke: '#9d174d',  // Pink 800
 *     dragSelect: '#f472b6'  // Pink 400
 *   },
 *   fonts: {
 *     normal: '10pt sans-serif',
 *     bold: 'bold 12pt sans-serif'
 *   },
 *   numbers: {
 *     group: 1,  // group strokeWidth
 *     selection: 3  // selection strokeWidth
 *   },
 *   margins: {
 *     group: new Margin(5)  // group padding
 *   },
 *   arrowheads: {
 *     toArrow: 'Standard'
 *   }
 * }
 * ```
 */
const ModernDark = {
    colors: {
        text: '#f3f4f6', // Gray 100
        comment: '#facc15', // Yellow 400
        link: '#818cf8', // Indigo 400
        group: '#9ca3af88', // Gray 400, partially transparent
        outline: '#9ca3af', // Gray 400
        selection: '#f472b6', // Pink 400
        div: '#111827', // Gray 900
        gridMinor: '#374151', // Gray 700
        gridMajor: '#4b5563', // Gray 600
        overviewBox: '#f472b6', // Pink 400
        tempLink: '#0ea5e9', // Sky 500
        tempPort: '#f472b6', // Pink 400
        adornmentFill: '#f472b6', // Pink 400
        adornmentStroke: '#9d174d', // Pink 800
        dragSelect: '#f472b6', // Pink 400
    },
    fonts: {
        normal: '10pt sans-serif',
        bold: 'bold 12pt sans-serif',
    },
    numbers: {
        group: 1,
        selection: 3,
    },
    margins: {
        group: new go.Margin(5),
    },
    arrowheads: {
        toArrow: 'Standard',
    },
};
/**
 * Below are some popular web color collections.
 *
 * * Once incorporated into a theme, these colors can be used to theme GraphObjects.
 * ```js
 * myDiagram.themeManager.set('', {
 *   colors: {
 *     ...<theme>.colors
 *   }
 * });
 *
 * myDiagram.nodeTemplate =
 *   new go.Node('Auto')
 *     .add(
 *       new go.Shape('RoundedRectangle')
 *         .theme('fill', 'colors.emerald.600')
 *         .theme('stroke', 'colors.emerald.800'),
 *       new go.TextBlock()
 *         .bind('text')
 *         .theme('stroke', 'colors.neutral.50')
 *     );
 * ```
 *
 * You can also use them to set your own color palette, then use those named palette colors.
 * ```js
 * const tw = <theme>.colors;
 * myDiagram.themeManager.set('light', {
 *   colors: {
 *     primary: tw.emerald[800],
 *     text: tw.neutral[50]
 *   }
 * });
 * myDiagram.themeManager.set('dark', {
 *   colors: {
 *     primary: tw.emerald[300],
 *     text: tw.neutral[950]
 *   }
 * });
 */
/**
 * This theme defines TailwindCSS-curated colors.
 * See https://tailwindcss.com/docs/customizing-colors.
 */
const Tailwind = {
    colors: {
        slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
        },
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712',
        },
        zinc: {
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
        },
        neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a',
        },
        stone: {
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
            950: '#0c0a09',
        },
        red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
            950: '#450a0a',
        },
        orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
            950: '#431407',
        },
        amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03',
        },
        yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
            950: '#422006',
        },
        lime: {
            50: '#f7fee7',
            100: '#ecfccb',
            200: '#d9f99d',
            300: '#bef264',
            400: '#a3e635',
            500: '#84cc16',
            600: '#65a30d',
            700: '#4d7c0f',
            800: '#3f6212',
            900: '#365314',
            950: '#1a2e05',
        },
        green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
        },
        emerald: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22',
        },
        teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
        },
        cyan: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
            950: '#083344',
        },
        sky: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
        },
        blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
        },
        indigo: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
            950: '#1e1b4b',
        },
        violet: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
            950: '#2e1065',
        },
        purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
        },
        fuchsia: {
            50: '#fdf4ff',
            100: '#fae8ff',
            200: '#f5d0fe',
            300: '#f0abfc',
            400: '#e879f9',
            500: '#d946ef',
            600: '#c026d3',
            700: '#a21caf',
            800: '#86198f',
            900: '#701a75',
            950: '#4a044e',
        },
        pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
            950: '#500724',
        },
        rose: {
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            300: '#fda4af',
            400: '#fb7185',
            500: '#f43f5e',
            600: '#e11d48',
            700: '#be123c',
            800: '#9f1239',
            900: '#881337',
            950: '#4c0519',
        },
    },
};
/**
 * This theme defines Open color-curated colors.
 * See https://yeun.github.io/open-color.
 */
const OpenColor = {
    colors: {
        gray: {
            0: '#f8f9fa',
            1: '#f1f3f5',
            2: '#e9ecef',
            3: '#dee2e6',
            4: '#ced4da',
            5: '#adb5bd',
            6: '#868e96',
            7: '#495057',
            8: '#343a40',
            9: '#212529',
        },
        red: {
            0: '#fff5f5',
            1: '#ffe3e3',
            2: '#ffc9c9',
            3: '#ffa8a8',
            4: '#ff8787',
            5: '#ff6b6b',
            6: '#fa5252',
            7: '#f03e3e',
            8: '#e03131',
            9: '#c92a2a',
        },
        pink: {
            0: '#fff0f6',
            1: '#ffdeeb',
            2: '#fcc2d7',
            3: '#faa2c1',
            4: '#f783ac',
            5: '#f06595',
            6: '#e64980',
            7: '#d6336c',
            8: '#c2255c',
            9: '#a61e4d',
        },
        grape: {
            0: '#f8f0fc',
            1: '#f3d9fa',
            2: '#eebefa',
            3: '#e599f7',
            4: '#da77f2',
            5: '#cc5de8',
            6: '#be4bdb',
            7: '#ae3ec9',
            8: '#9c36b5',
            9: '#862e9c',
        },
        violet: {
            0: '#f3f0ff',
            1: '#e5dbff',
            2: '#d0bfff',
            3: '#b197fc',
            4: '#9775fa',
            5: '#845ef7',
            6: '#7950f2',
            7: '#7048e8',
            8: '#6741d9',
            9: '#5f3dc4',
        },
        indigo: {
            0: '#edf2ff',
            1: '#dbe4ff',
            2: '#bac8ff',
            3: '#91a7ff',
            4: '#748ffc',
            5: '#5c7cfa',
            6: '#4c6ef5',
            7: '#4263eb',
            8: '#3b5bdb',
            9: '#364fc7',
        },
        blue: {
            0: '#e7f5ff',
            1: '#d0ebff',
            2: '#a5d8ff',
            3: '#74c0fc',
            4: '#4dabf7',
            5: '#339af0',
            6: '#228be6',
            7: '#1c7ed6',
            8: '#1971c2',
            9: '#1864ab',
        },
        cyan: {
            0: '#e3fafc',
            1: '#c5f6fa',
            2: '#99e9f2',
            3: '#66d9e8',
            4: '#3bc9db',
            5: '#22b8cf',
            6: '#15aabf',
            7: '#1098ad',
            8: '#0c8599',
            9: '#0b7285',
        },
        teal: {
            0: '#e6fcf5',
            1: '#c3fae8',
            2: '#96f2d7',
            3: '#63e6be',
            4: '#38d9a9',
            5: '#20c997',
            6: '#12b886',
            7: '#0ca678',
            8: '#099268',
            9: '#087f5b',
        },
        green: {
            0: '#ebfbee',
            1: '#d3f9d8',
            2: '#b2f2bb',
            3: '#8ce99a',
            4: '#69db7c',
            5: '#51cf66',
            6: '#40c057',
            7: '#37b24d',
            8: '#2f9e44',
            9: '#2b8a3e',
        },
        lime: {
            0: '#f4fce3',
            1: '#e9fac8',
            2: '#d8f5a2',
            3: '#c0eb75',
            4: '#a9e34b',
            5: '#94d82d',
            6: '#82c91e',
            7: '#74b816',
            8: '#66a80f',
            9: '#5c940d',
        },
        yellow: {
            0: '#fff9db',
            1: '#fff3bf',
            2: '#ffec99',
            3: '#ffe066',
            4: '#ffd43b',
            5: '#fcc419',
            6: '#fab005',
            7: '#f59f00',
            8: '#f08c00',
            9: '#e67700',
        },
        orange: {
            0: '#fff4e6',
            1: '#ffe8cc',
            2: '#ffd8a8',
            3: '#ffc078',
            4: '#ffa94d',
            5: '#ff922b',
            6: '#fd7e14',
            7: '#f76707',
            8: '#e8590c',
            9: '#d9480f',
        },
    },
};
