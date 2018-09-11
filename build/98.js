webpackJsonp([98],{

/***/ 1784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/core/comments/components/components.module.ts
var components_components_module = __webpack_require__(422);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.module.ts
var compile_html_module = __webpack_require__(419);

// EXTERNAL MODULE: ./src/addon/mod/data/components/components.module.ts + 2 modules
var data_components_components_module = __webpack_require__(420);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/groups.ts
var groups = __webpack_require__(63);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(15);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/data.ts
var data = __webpack_require__(93);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/helper.ts
var helper = __webpack_require__(242);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/offline.ts
var offline = __webpack_require__(201);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/sync.ts
var sync = __webpack_require__(280);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/fields-delegate.ts
var fields_delegate = __webpack_require__(104);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.ts
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














/**
 * Page that displays the view entry page.
 */
var entry_AddonModDataEntryPage = /** @class */ (function () {
    function AddonModDataEntryPage(params, utils, groupsProvider, domUtils, fieldsDelegate, courseProvider, dataProvider, dataOffline, dataHelper, sitesProvider, navCtrl, eventsProvider) {
        this.utils = utils;
        this.groupsProvider = groupsProvider;
        this.domUtils = domUtils;
        this.fieldsDelegate = fieldsDelegate;
        this.courseProvider = courseProvider;
        this.dataProvider = dataProvider;
        this.dataOffline = dataOffline;
        this.dataHelper = dataHelper;
        this.navCtrl = navCtrl;
        this.eventsProvider = eventsProvider;
        this.fields = {};
        this.title = '';
        this.moduleName = 'data';
        this.component = data["a" /* AddonModDataProvider */].COMPONENT;
        this.entryLoaded = false;
        this.selectedGroup = 0;
        this.offlineActions = [];
        this.hasOffline = false;
        this.cssTemplate = '';
        this.entryRendered = '';
        this.cssClass = '';
        this.extraImports = [data_components_components_module["a" /* AddonModDataComponentsModule */]];
        this.module = params.get('module') || {};
        this.entryId = params.get('entryId') || null;
        this.courseId = params.get('courseId');
        this.selectedGroup = params.get('group') || 0;
        this.page = params.get('page') || null;
        this.siteId = sitesProvider.getCurrentSiteId();
        this.title = this.module.name;
        this.moduleName = this.courseProvider.translateModuleName('data');
    }
    /**
     * View loaded.
     */
    AddonModDataEntryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchEntryData();
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(sync["a" /* AddonModDataSyncProvider */].AUTO_SYNCED, function (data) {
            if ((data.entryId == _this.entryId || data.offlineEntryId == _this.entryId) && _this.data.id == data.dataId) {
                if (data.deleted) {
                    // If deleted, go back.
                    _this.navCtrl.pop();
                }
                else {
                    _this.entryId = data.entryid;
                    _this.entryLoaded = false;
                    _this.fetchEntryData(true);
                }
            }
        }, this.siteId);
        // Refresh entry on change.
        this.entryChangedObserver = this.eventsProvider.on(data["a" /* AddonModDataProvider */].ENTRY_CHANGED, function (data) {
            if (data.entryId == _this.entryId && _this.data.id == data.dataId) {
                if (data.deleted) {
                    // If deleted, go back.
                    _this.navCtrl.pop();
                }
                else {
                    _this.entryLoaded = false;
                    _this.fetchEntryData(true);
                }
            }
        }, this.siteId);
    };
    /**
     * Fetch the entry data.
     *
     * @param  {boolean}      refresh If refresh the current data or not.
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEntryPage.prototype.fetchEntryData = function (refresh) {
        var _this = this;
        var fieldsArray;
        return this.dataProvider.getDatabase(this.courseId, this.module.id).then(function (data) {
            _this.title = data.name || _this.title;
            _this.data = data;
            _this.cssClass = 'addon-data-entries-' + data.id;
            return _this.setEntryIdFromPage(data.id, _this.page, _this.selectedGroup).then(function () {
                return _this.dataProvider.getDatabaseAccessInformation(data.id);
            });
        }).then(function (accessData) {
            _this.access = accessData;
            return _this.groupsProvider.getActivityGroupInfo(_this.data.coursemodule, accessData.canmanageentries)
                .then(function (groupInfo) {
                _this.groupInfo = groupInfo;
                // Check selected group is accessible.
                if (groupInfo && groupInfo.groups && groupInfo.groups.length > 0) {
                    if (!groupInfo.groups.some(function (group) { return _this.selectedGroup == group.id; })) {
                        _this.selectedGroup = groupInfo.groups[0].id;
                    }
                }
                return _this.dataOffline.getEntryActions(_this.data.id, _this.entryId);
            });
        }).then(function (actions) {
            _this.offlineActions = actions;
            _this.hasOffline = !!actions.length;
            return _this.dataProvider.getFields(_this.data.id).then(function (fieldsData) {
                _this.fields = _this.utils.arrayToObject(fieldsData, 'id');
                return _this.dataHelper.getEntry(_this.data, _this.entryId, _this.offlineActions);
            });
        }).then(function (entry) {
            entry = entry.entry;
            _this.cssTemplate = _this.dataHelper.prefixCSS(_this.data.csstemplate, '.' + _this.cssClass);
            // Index contents by fieldid.
            entry.contents = _this.utils.arrayToObject(entry.contents, 'fieldid');
            fieldsArray = _this.utils.objectToArray(_this.fields);
            return _this.dataHelper.applyOfflineActions(entry, _this.offlineActions, fieldsArray);
        }).then(function (entryData) {
            _this.entry = entryData;
            var actions = _this.dataHelper.getActions(_this.data, _this.access, _this.entry);
            _this.entryRendered = _this.dataHelper.displayShowFields(_this.data.singletemplate, fieldsArray, _this.entry, 'show', actions);
            _this.showComments = actions.comments;
            var entries = {};
            entries[_this.entryId] = _this.entry;
            // Pass the input data to the component.
            _this.jsData = {
                fields: _this.fields,
                entries: entries,
                data: _this.data
            };
            return _this.dataHelper.getPageInfoByEntry(_this.data.id, _this.entryId, _this.selectedGroup).then(function (result) {
                _this.previousId = result.previousId;
                _this.nextId = result.nextId;
            });
        }).catch(function (message) {
            if (!refresh) {
                // Some call failed, retry without using cache since it might be a new activity.
                return _this.refreshAllData();
            }
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
        }).finally(function () {
            _this.domUtils.scrollToTop(_this.content);
            _this.entryLoaded = true;
        });
    };
    /**
     * Go to selected entry without changing state.
     *
     * @param  {number}       entry Entry Id where to go.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonModDataEntryPage.prototype.gotoEntry = function (entry) {
        this.entryId = entry;
        this.page = null;
        this.entryLoaded = false;
        return this.fetchEntryData();
    };
    /**
     * Refresh all the data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshAllData = function () {
        var _this = this;
        var promises = [];
        promises.push(this.dataProvider.invalidateDatabaseData(this.courseId));
        if (this.data) {
            promises.push(this.dataProvider.invalidateEntryData(this.data.id, this.entryId));
            promises.push(this.groupsProvider.invalidateActivityGroupInfo(this.data.coursemodule));
            promises.push(this.dataProvider.invalidateEntriesData(this.data.id));
        }
        return Promise.all(promises).finally(function () {
            return _this.fetchEntryData(true);
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshDatabase = function (refresher) {
        if (this.entryLoaded) {
            return this.refreshAllData().finally(function () {
                refresher && refresher.complete();
            });
        }
    };
    /**
     * Set group to see the database.
     *
     * @param  {number}       groupId Group identifier to set.
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEntryPage.prototype.setGroup = function (groupId) {
        var _this = this;
        this.selectedGroup = groupId;
        this.entryLoaded = false;
        return this.setEntryIdFromPage(this.data.id, 0, this.selectedGroup).then(function () {
            return _this.fetchEntryData();
        });
    };
    /**
     * Convenience function to translate page number to entry identifier.
     *
     * @param  {number}       dataId       Data Id.
     * @param  {number}       [pageNumber] Page number where to go
     * @param  {number}       group        Group Id to get the entry.
     * @return {Promise<any>}              Resolved when done.
     */
    AddonModDataEntryPage.prototype.setEntryIdFromPage = function (dataId, pageNumber, group) {
        var _this = this;
        if (typeof pageNumber == 'number') {
            return this.dataHelper.getPageInfoByPage(dataId, pageNumber, group).then(function (result) {
                _this.entryId = result.entryId;
                _this.page = null;
            });
        }
        return Promise.resolve();
    };
    /**
     * Component being destroyed.
     */
    AddonModDataEntryPage.prototype.ngOnDestroy = function () {
        this.syncObserver && this.syncObserver.off();
        this.entryChangedObserver && this.entryChangedObserver.off();
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModDataEntryPage.prototype, "content", void 0);
    AddonModDataEntryPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-data-entry',
            templateUrl: 'entry.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["s" /* NavParams */], utils_utils["a" /* CoreUtilsProvider */], groups["a" /* CoreGroupsProvider */],
            dom["a" /* CoreDomUtilsProvider */], fields_delegate["a" /* AddonModDataFieldsDelegate */],
            course["a" /* CoreCourseProvider */], data["a" /* AddonModDataProvider */],
            offline["a" /* AddonModDataOfflineProvider */], helper["a" /* AddonModDataHelperProvider */],
            sites["a" /* CoreSitesProvider */], ionic_angular["r" /* NavController */],
            events["a" /* CoreEventsProvider */]])
    ], AddonModDataEntryPage);
    return AddonModDataEntryPage;
}());

//# sourceMappingURL=entry.js.map
// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.module.ts
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var entry_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var entry_module_AddonModDataEntryPageModule = /** @class */ (function () {
    function AddonModDataEntryPageModule() {
    }
    AddonModDataEntryPageModule = entry_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                entry_AddonModDataEntryPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                data_components_components_module["a" /* AddonModDataComponentsModule */],
                compile_html_module["a" /* CoreCompileHtmlComponentModule */],
                components_components_module["a" /* CoreCommentsComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(entry_AddonModDataEntryPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModDataEntryPageModule);
    return AddonModDataEntryPageModule;
}());

//# sourceMappingURL=entry.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1273);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1274);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1275);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1276);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1277);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1278);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1279);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1280);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1281);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1284);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1285);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1286);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1287);

// EXTERNAL MODULE: ./src/core/comments/components/comments/comments.ngfactory.js
var comments_ngfactory = __webpack_require__(640);

// EXTERNAL MODULE: ./src/addon/mod/data/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1298);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(100);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(113);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(18);

// EXTERNAL MODULE: ./src/core/comments/components/comments/comments.ts
var comments = __webpack_require__(348);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/core/comments/providers/comments.ts
var providers_comments = __webpack_require__(155);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(114);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(149);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(115);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(417);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1282);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(191);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(632);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1283);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(236);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(39);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(24);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(192);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(144);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(56);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(50);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.ngfactory.js
var compile_html_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.ts
var compile_html = __webpack_require__(157);

// EXTERNAL MODULE: ./src/core/compile/providers/compile.ts
var compile = __webpack_require__(127);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






































































var styles_AddonModDataEntryPage = ["{{ cssTemplate }}"];
var RenderType_AddonModDataEntryPage = core["_29" /* ɵcrt */]({ encapsulation: 0, styles: styles_AddonModDataEntryPage, data: {} });

function View_AddonModDataEntryPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "div", [["class", "core-warning-card"], ["icon-start", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](4, null, ["\n            ", "\n        "])), core["_48" /* ɵpod */](5, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 6).transform("core.hasdatatosync", _ck(_v, 5, 0, _co.moduleName))); _ck(_v, 4, 0, currVal_2); }); }
function View_AddonModDataEntryPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-label", [["id", "addon-data-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "addon-data-groupslabel"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.groupsseparate")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEntryPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-label", [["id", "addon-data-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "addon-data-groupslabel"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.groupsvisible")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEntryPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[5, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEntryPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 24, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModDataEntryPage_3)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModDataEntryPage_4)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 10, "ion-select", [["aria-labelledby", "addon-data-groupslabel"], ["interface", "popover"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 14)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 14)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.selectedGroup = $event) !== false);
        ad = (pd_2 && ad);
    } if (("ionChange" === en)) {
        var pd_3 = (_co.setGroup(_co.selectedGroup) !== false);
        ad = (pd_3 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](14, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, { ionChange: "ionChange" }), core["_52" /* ɵqud */](603979776, 5, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](17, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](19, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEntryPage_5)), core["_30" /* ɵdid */](22, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.groupInfo.separateGroups; _ck(_v, 8, 0, currVal_0); var currVal_1 = _co.groupInfo.visibleGroups; _ck(_v, 11, 0, currVal_1); var currVal_10 = "popover"; _ck(_v, 14, 0, currVal_10); var currVal_11 = _co.selectedGroup; _ck(_v, 17, 0, currVal_11); var currVal_12 = _co.groupInfo.groups; _ck(_v, 22, 0, currVal_12); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 14)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 19).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 19).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 19).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 19).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 19).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 19).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 19).ngClassPending; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonModDataEntryPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 6, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 8, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-comments", [["area", "database_entry"], ["component", "mod_data"], ["contextLevel", "module"]], null, null, null, comments_ngfactory["c" /* View_CoreCommentsCommentsComponent_0 */], comments_ngfactory["b" /* RenderType_CoreCommentsCommentsComponent */])), core["_30" /* ɵdid */](8, 114688, null, 0, comments["a" /* CoreCommentsCommentsComponent */], [nav_params["a" /* NavParams */], nav_controller["a" /* NavController */], providers_comments["a" /* CoreCommentsProvider */]], { contextLevel: [0, "contextLevel"], instanceId: [1, "instanceId"], component: [2, "component"], itemId: [3, "itemId"], area: [4, "area"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "module"; var currVal_1 = _co.data.coursemodule; var currVal_2 = "mod_data"; var currVal_3 = _co.entry.id; var currVal_4 = "database_entry"; _ck(_v, 8, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); }, null); }
function View_AddonModDataEntryPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-start", ""], ["ion-button", ""], ["outline", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoEntry(_co.previousId) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { outline: [0, "outline"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](7, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["\n                        ", "\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 7, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_2); var currVal_5 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.previous")); _ck(_v, 8, 0, currVal_5); }); }
function View_AddonModDataEntryPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-end", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoEntry(_co.nextId) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                        ", "\n                        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 4, 0, currVal_0); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.next")); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonModDataEntryPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-grid", [["class", "grid"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEntryPage_8)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEntryPage_9)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.previousId; _ck(_v, 7, 0, currVal_0); var currVal_1 = _co.nextId; _ck(_v, 10, 0, currVal_1); }, null); }
function View_AddonModDataEntryPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](11, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 34, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](16, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshDatabase($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](19, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](22, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 1, 22, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](27, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_1)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_2)), core["_30" /* ɵdid */](34, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](36, 0, null, 0, 5, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, null, 1, "core-compile-html", [], null, null, null, compile_html_ngfactory["b" /* View_CoreCompileHtmlComponent_0 */], compile_html_ngfactory["a" /* RenderType_CoreCompileHtmlComponent */])), core["_30" /* ɵdid */](40, 966656, null, 0, compile_html["a" /* CoreCompileHtmlComponent */], [compile["a" /* CoreCompileProvider */], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]], core["F" /* KeyValueDiffers */], dom["a" /* CoreDomUtilsProvider */]], { text: [0, "text"], jsData: [1, "jsData"], extraImports: [2, "extraImports"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_6)), core["_30" /* ɵdid */](44, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_7)), core["_30" /* ɵdid */](47, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_2 = _co.title; _ck(_v, 11, 0, currVal_2); var currVal_7 = _co.entryLoaded; _ck(_v, 19, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 22, 0, core["_44" /* ɵnov */](_v, 23).transform("core.pulltorefresh")), ""); _ck(_v, 22, 0, currVal_9); var currVal_10 = _co.entryLoaded; _ck(_v, 27, 0, currVal_10); var currVal_11 = _co.hasOffline; _ck(_v, 31, 0, currVal_11); var currVal_12 = (_co.groupInfo && (_co.groupInfo.separateGroups || _co.groupInfo.visibleGroups)); _ck(_v, 34, 0, currVal_12); var currVal_14 = _co.entryRendered; var currVal_15 = _co.jsData; var currVal_16 = _co.extraImports; _ck(_v, 40, 0, currVal_14, currVal_15, currVal_16); var currVal_17 = (_co.data && _co.entry); _ck(_v, 44, 0, currVal_17); var currVal_18 = (_co.previousId || _co.nextId); _ck(_v, 47, 0, currVal_18); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = core["_44" /* ɵnov */](_v, 16).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 19).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 19)._top; _ck(_v, 18, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 22).r.state; _ck(_v, 21, 0, currVal_8); var currVal_13 = core["_34" /* ɵinlineInterpolate */](1, "addon-data-contents ", _co.cssClass, ""); _ck(_v, 36, 0, currVal_13); }); }
function View_AddonModDataEntryPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-data-entry", [], null, null, null, View_AddonModDataEntryPage_0, RenderType_AddonModDataEntryPage)), core["_30" /* ɵdid */](1, 180224, null, 0, entry_AddonModDataEntryPage, [nav_params["a" /* NavParams */], utils_utils["a" /* CoreUtilsProvider */], groups["a" /* CoreGroupsProvider */], dom["a" /* CoreDomUtilsProvider */], fields_delegate["a" /* AddonModDataFieldsDelegate */], course["a" /* CoreCourseProvider */], data["a" /* AddonModDataProvider */], offline["a" /* AddonModDataOfflineProvider */], helper["a" /* AddonModDataHelperProvider */], sites["a" /* CoreSitesProvider */], nav_controller["a" /* NavController */], events["a" /* CoreEventsProvider */]], null, null)], null, null); }
var AddonModDataEntryPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-data-entry", entry_AddonModDataEntryPage, View_AddonModDataEntryPage_Host_0, {}, {}, []);

//# sourceMappingURL=entry.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(321);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(322);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(416);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(631);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(237);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModDataEntryPageModuleNgFactory", function() { return AddonModDataEntryPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





































var AddonModDataEntryPageModuleNgFactory = core["_28" /* ɵcmf */](entry_module_AddonModDataEntryPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], comments_ngfactory["a" /* CoreCommentsCommentsComponentNgFactory */], index_ngfactory["a" /* AddonModDataIndexComponentNgFactory */], AddonModDataEntryPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, compile_html_module["a" /* CoreCompileHtmlComponentModule */], compile_html_module["a" /* CoreCompileHtmlComponentModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCommentsComponentsModule */], components_components_module["a" /* CoreCommentsComponentsModule */], []), core["_41" /* ɵmpd */](512, data_components_components_module["a" /* AddonModDataComponentsModule */], data_components_components_module["a" /* AddonModDataComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, entry_module_AddonModDataEntryPageModule, entry_module_AddonModDataEntryPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], entry_AddonModDataEntryPage, [])]); });

//# sourceMappingURL=entry.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=98.js.map