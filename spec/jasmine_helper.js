// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function chromeSpec(name, func) {
  chromespec.registerJasmineTestInstance(!!window.runningInBg, name, func);
}

function itShouldHaveAnEvent(obj, eventName) {
  it('should have an event called ' + eventName, function() {
    expect(obj[eventName]).toEqual(jasmine.any(chrome.Event));
  });
}

function itShouldHaveAPropertyOfType(obj, propName, typeName) {
  it('should have a "' + propName + '" ' + typeName, function() {
    expect(typeof obj[propName]).toBe(typeName);
  });
}

function waitUntilCalled(callback, opt_timeout) {
  var done = false;
  var wrapped = function() {
    done = true;
    return callback.apply(this, arguments);
  };
  waitsFor(function() { return done; }, opt_timeout);
  return wrapped;
}

function waitUntilCalledAndThenRun(callback, andthen) {
  var ret = waitUntilCalled(callback);
  runs(andthen);
  return ret;
}