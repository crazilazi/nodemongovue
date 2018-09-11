import merge from "lodash.merge";
import { SinonSpy } from "sinon";
import Vue, { Component } from "vue";
import { ILogger } from "./log";

export interface IComponents {
  [key: string]: Component;
}

export class ComponentTest {

  vm: Vue;

  constructor(private template: string, private components: IComponents) {
  }

  createComponent(createOptions?: any): void {
    const options = {
      template: this.template,
      components: this.components,
    };
    if (createOptions) { merge(options, createOptions); }
    this.vm = new Vue(options).$mount();
  }

  async execute(callback: (vm: Vue) => Promise<void> | void): Promise<void> {
    await Vue.nextTick();
    await callback(this.vm);
  }

}

export class MockLogger implements ILogger {

  constructor(private loggerSpy: SinonSpy) {
  }

  info(msg: any) {
    this.loggerSpy(msg);
  }

  warn(msg: any) {
    this.loggerSpy(msg);
  }

  error(msg: any) {
    this.loggerSpy(msg);
  }
}
