import { Logger } from "./Logger";

// ====================================================================================================
// [Tool]
// ====================================================================================================

export class Tool {

  static copyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    let style: CSSStyleDeclaration = textArea.style;
    style.position = 'fixed';
    style.top = 0;
    style.left = 0;
    style.width = '2em';
    style.height = '2em';
    style.padding = 0;
    style.border = 'none';
    style.outline = 'none';
    style.boxShadow = 'none';
    style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('[Tool.copyTextToClipboard()] Oops, unable to copy!');
    }
    document.body.removeChild(textArea);
  }

  // ----------------------------------------------------------------------------------------------------

  /*
  return:
     1: v1 > v2
     0: v1 = v2
    -1: v1 < v2
  */

  static versionCompare(v1, v2) {
    if (typeof v1 + typeof v2 != 'stringstring') {
      return false;
    }

    let a = v1.split('.');
    let b = v2.split('.');
    let length = Math.max(a.length, b.length);
    for (let i = 0; i < length; i++) {
      if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
        return 1;
      } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
        return -1;
      }
    }
    return 0;
  }

  // ----------------------------------------------------------------------------------------------------

  static removeFromArray(array: Array, item) {
    let index: Number = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  // ----------------------------------------------------------------------------------------------------

  static executeFunction(func: Function, thisObj: Object, args: Array = []) {
    if (!func || typeof func != "function") return;
    func.apply(thisObj, args);
  }

  // ----------------------------------------------------------------------------------------------------

  static scrollTo($element: HTMLElement, offset: Number = 0) {
    let body: HTMLElement = (document.compatMode == "BackCompat") ?
      document.body :
      document.documentElement;

    let $offset = $element.offset();
    if ($offset) {
      let scrollTop: Number = Math.max(0, $element.offset().top - 300);
      body.scrollTop = scrollTop;
      Logger.log(`[Tool.scrollTo()] scrollTop: ${scrollTop}`);
    }
  }



  // ----------------------------------------------------------------------------------------------------
  // [AD Killer]
  // ----------------------------------------------------------------------------------------------------

  static killAD() {
    // Google AD
    var ads = $('.adsbygoogle').remove();
    if (ads.length > 0) {
      console.log(`[TRACE] [Remove adsbygoogle]`, ads);
    }
  }



};
