/* eslint import/no-nodejs-modules: "off" */

import React from "react";
import { TextEncoder, TextDecoder } from "util";

window.React = React;

Element.prototype.scrollTo = jest.fn();

Object.assign(global, { TextDecoder, TextEncoder });
