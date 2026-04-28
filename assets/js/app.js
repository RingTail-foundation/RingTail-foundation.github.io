import { PARTIALS } from './constants.js';
import { mountPartials } from './loader.js';
import { initVersionPicker } from './version-picker.js';
import { initDownload } from './download.js';
import { initDnD } from './converter-dnd.js';
import { initRun } from './converter-run.js';

await mountPartials(PARTIALS);
initVersionPicker();
initDownload();
initDnD();
initRun();
