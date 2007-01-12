/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 by 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * Crossbrowser operations on DOM Nodes
 */
qx.OO.defineClass("qx.dom.Element");


/**
 * Removes whitespace-only text node children
 *
 * @param vElement {Element} DOM element
 */
qx.Class.cleanWhitespace = function(vElement)
{
  for (var i=0; i<vElement.childNodes.length; i++)
  {
    var node = vElement.childNodes[i];

    if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
      vElement.removeChild(node);
    }
  }
}


/**
 * Checks if a element has no content
 *
 * @param vElement {Element} DOM element
 */
qx.Class.isEmpty = function(vElement) {
  return vElement.innerHTML.match(/^\s*$/);
}


/**
 * Returns the text content of a DOM element
 * http://developer.mozilla.org/en/docs/DOM:element.textContent
 *
 * @param element {Element} DOM Element
 * @return {String}
 */
 qx.Class.getTextContent = function(element) {
  var text = "";
  var childNodes = element.childNodes;
  for (var i=0; i<childNodes.length; i++) {
    var node = childNodes[i];
    if (node.nodeType == qx.dom.Node.TEXT || node.nodeType == qx.dom.Node.CDATA_SECTION) {
      text += node.nodeValue;
    }
  }
  return text;
};


/**
 * Sets the textValue of the given DOM element (http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-textContent).
 * Wrapper for element.innerText and element.textContent.
 *
 * @param vElement {Element} DOM node
 * @param sValue {String} the value
 */
qx.Class.setTextContent = function(vElement, sValue) {};

if (qx.sys.Client.getInstance().supportsTextContent()) {
  qx.Class.setTextContent = function(vElement, sValue) {
    vElement.textContent = sValue;
  };
} else if (qx.sys.Client.getInstance().supportsInnerText()) {
  qx.Class.setTextContent = function(vElement, sValue) {
    vElement.innerText = sValue;
  };
} else {
  qx.Class.setTextContent = function(vElement, sValue) {
    vElement.innerHTML = qx.html.String.escape(sValue);
  };
}
