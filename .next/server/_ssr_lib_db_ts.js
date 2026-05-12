"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_lib_db_ts";
exports.ids = ["_ssr_lib_db_ts"];
exports.modules = {

/***/ "(ssr)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dexie */ \"(ssr)/./node_modules/dexie/import-wrapper.mjs\");\n\nconst db = new dexie__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('ClinicalAppDB');\n// Schema declaration\ndb.version(1).stores({\n    drugs: 'id, genericName, drugClass, *brandNames',\n    icd10: 'code, name, indonesian',\n    guidelines: '++id, title.en, title.id, category'\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBZ0Q7QUFpQmhELE1BQU1DLEtBQUssSUFBSUQsNkNBQUtBLENBQUM7QUFNckIscUJBQXFCO0FBQ3JCQyxHQUFHQyxPQUFPLENBQUMsR0FBR0MsTUFBTSxDQUFDO0lBQ25CQyxPQUFPO0lBQ1BDLE9BQU87SUFDUEMsWUFBWTtBQUNkO0FBRUEsaUVBQWVMLEVBQUVBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYW5kaS9HaXRodWIvQW5lc3RoZXNpYS9saWIvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERleGllLCB7IHR5cGUgRW50aXR5VGFibGUgfSBmcm9tICdkZXhpZSc7XG5pbXBvcnQgdHlwZSB7IERydWcgfSBmcm9tICcuL2RydWdzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ0QxMFJlY29yZCB7XG4gIGNvZGU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBpbmRvbmVzaWFuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3VpZGVsaW5lUmVjb3JkIHtcbiAgaWQ/OiBudW1iZXI7XG4gIHRpdGxlOiB7IGVuOiBzdHJpbmc7IGlkOiBzdHJpbmcgfTtcbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgY29udGVudDogeyBlbjogc3RyaW5nOyBpZDogc3RyaW5nIH07XG4gIHBkZlVybD86IHN0cmluZztcbn1cblxuY29uc3QgZGIgPSBuZXcgRGV4aWUoJ0NsaW5pY2FsQXBwREInKSBhcyBEZXhpZSAmIHtcbiAgZHJ1Z3M6IEVudGl0eVRhYmxlPERydWcsICdpZCc+O1xuICBpY2QxMDogRW50aXR5VGFibGU8SUNEMTBSZWNvcmQsICdjb2RlJz47XG4gIGd1aWRlbGluZXM6IEVudGl0eVRhYmxlPEd1aWRlbGluZVJlY29yZCwgJ2lkJz47XG59O1xuXG4vLyBTY2hlbWEgZGVjbGFyYXRpb25cbmRiLnZlcnNpb24oMSkuc3RvcmVzKHtcbiAgZHJ1Z3M6ICdpZCwgZ2VuZXJpY05hbWUsIGRydWdDbGFzcywgKmJyYW5kTmFtZXMnLCAvLyBQcmltYXJ5IGtleSBhbmQgaW5kZXhlZCBwcm9wc1xuICBpY2QxMDogJ2NvZGUsIG5hbWUsIGluZG9uZXNpYW4nLFxuICBndWlkZWxpbmVzOiAnKytpZCwgdGl0bGUuZW4sIHRpdGxlLmlkLCBjYXRlZ29yeSdcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkYjtcbiJdLCJuYW1lcyI6WyJEZXhpZSIsImRiIiwidmVyc2lvbiIsInN0b3JlcyIsImRydWdzIiwiaWNkMTAiLCJndWlkZWxpbmVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./lib/db.ts\n");

/***/ })

};
;