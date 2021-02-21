var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
};
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Handle } from './Handle';
import styles from './Item.css';
export const Item = React.memo(React.forwardRef((_a, ref) => {
  var { color, dragOverlay, dragging, disabled, fadeIn, handle, height, index, listeners, renderItem, sorting, style, transition, transform, value, wrapperStyle } = _a, props = __rest(_a, ["color", "dragOverlay", "dragging", "disabled", "fadeIn", "handle", "height", "index", "listeners", "renderItem", "sorting", "style", "transition", "transform", "value", "wrapperStyle"]);
  useEffect(() => {
      if (!dragOverlay) {
          return;
      }
      document.body.style.cursor = 'grabbing';
      return () => {
          document.body.style.cursor = '';
      };
  }, [dragOverlay]);
  return renderItem ? (renderItem({
      dragOverlay: Boolean(dragOverlay),
      dragging: Boolean(dragging),
      sorting: Boolean(sorting),
      index,
      fadeIn: Boolean(fadeIn),
      listeners,
      ref,
      style,
      transform,
      transition,
      value,
  })) : (React.createElement("li", { className: classNames("Wrapper", "Item", fadeIn && styles.fadeIn, sorting && styles.sorting, dragOverlay && styles.dragOverlay), style: Object.assign(Object.assign({}, wrapperStyle), { transition, '--translate-x': transform
              ? `${Math.round(transform.x)}px`
              : undefined, '--translate-y': transform
              ? `${Math.round(transform.y)}px`
              : undefined, '--scale-x': (transform === null || transform === void 0 ? void 0 : transform.scaleX) ? `${transform.scaleX}`
              : undefined, '--scale-y': (transform === null || transform === void 0 ? void 0 : transform.scaleY) ? `${transform.scaleY}`
              : undefined, '--index': index, '--color': color }), ref: ref },
      React.createElement("div", Object.assign({ className: classNames(styles.Item, dragging && styles.dragging, handle && styles.withHandle, dragOverlay && styles.dragOverlay, disabled && styles.disabled, color && styles.color), tabIndex: !handle ? 0 : undefined, style: style, "data-cypress": "draggable-item" }, (!handle ? listeners : undefined), props),
          value,
          handle ? React.createElement(Handle, Object.assign({}, listeners)) : null)));
}));