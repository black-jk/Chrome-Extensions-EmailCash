// ====================================================================================================
// [Global]
// ====================================================================================================
import _AppConfig from './config/AppConfig';
import * as _HotKeyManager from './ec/managers/HotKeyManager'

export const AppConfig: _AppConfig = new _AppConfig;

export const HotKeyManager: _HotKeyManager.HotKeyManager = new _HotKeyManager.HotKeyManager;
