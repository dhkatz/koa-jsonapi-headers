import del from 'del';
import tslint from 'gulp-tslint';

import * as sourcemaps from 'gulp-sourcemaps';
import * as typescript from 'gulp-typescript';
import * as merge from 'merge2';
import * as path from 'path';

import { dest, series, src, watch } from 'gulp';
import { ICompileStream } from 'gulp-typescript/release/project';

const project = typescript.createProject('tsconfig.json');
// tslint:disable-next-line:no-var-requires
const linter = require('tslint').Linter.createProgram('tsconfig.json');

function lint() {
  return src(['src/**/*.ts'])
    .pipe(tslint({ configuration: 'tslint.json', formatter: 'verbose', program: linter }))
    .pipe(tslint.report());
}

function build() {
  del.sync(['lib/**/*.*']);

  const compiled: ICompileStream = src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(project());

  return merge([
    compiled.js
    .pipe(sourcemaps.write({ sourceRoot: (file) => path.relative(path.join(file.cwd, file.path), file.base) }))
    .pipe(dest('lib/')),
    compiled.dts
      .pipe(dest('lib/')),
  ]);
}

function update() {
  watch('src/**/*.ts', series(lint, build));
}

exports.lint = lint;
exports.build = series(lint, build);
exports.watch = series(lint, build, update);
exports.default = series(lint, build);
