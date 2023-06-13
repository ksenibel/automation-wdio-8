import {ReportGenerator, ReportAggregator, HtmlReporter} from 'wdio-html-nice-reporter';

const reportsDirectory = './reports/html-reports/';

export const config = {
    runner: 'local',
    specs: [
        './test/specs/*.e2e.js'
    ],
    exclude: [
        // './test/specs/examples/**/*.js'
    ],
    suites: {
        exercise: ['./test/specs/exercise.e2e.js'],
        homework: ['./test/specs/homework/*.e2e.js'],
        lesson_01: ['./test/specs/examples/lesson-01/**/*.e2e.js'],
        lesson_02: ['./test/specs/examples/lesson-02/**/*.e2e.js'],
        lesson_03: ['./test/specs/examples/lesson-03/**/*.e2e.js'],
        lesson_04: ['./test/specs/examples/lesson-04/**/*.e2e.js'],
        lesson_05: ['./test/specs/examples/lesson-05/**/*.e2e.js'],
        lesson_07: ['./test/specs/examples/lesson-07/**/*.e2e.js'],
        lesson_08: ['./test/specs/examples/lesson-08/**/*.e2e.js'],
        lesson_09: ['./test/specs/examples/lesson-09/**/*.e2e.js'],
        lesson_10: ['./test/specs/examples/lesson-10/**/*.e2e.js'],
        lesson_11: ['./test/specs/examples/lesson-11/**/*.e2e.js']
    },
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                // '--window-size=1920,1080',
                // '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: [
                // '-headless'
            ]
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ["html-nice", {
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Automatizované Testování',
            linkScreenshots: true,
            showInBrowser: true,
            collapseTests: false,
            useOnAfterCommandForScreenshot: true
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: (config, capabilities) => {
        let reportAggregator = new ReportAggregator({
            outputDir: reportsDirectory,
            filename: 'master-report.html',
            reportTitle: 'Czechitas Test Automation',
            browserName : capabilities.browserName,
            collapseTests: true,
        });
        reportAggregator.clean() ;
        
    
    },
    onComplete: function (exitCode, config, capabilities, results) {
        (async () => {
            await reportAggregator.createReport();
        })();
    }

}
