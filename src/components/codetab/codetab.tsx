import {
  Component,
  ComponentInterface,
  Prop,
  Element,
  State,
  Host,
  h
} from "@stencil/core";

import { isStringArray } from '../../utils/utils';

@Component({
  tag: "fortyseven-codetab",
  styleUrl: "codetab.css",
  shadow: true
})
export class Codetab implements ComponentInterface {
  @Prop({ mutable: true }) dataLanguages: string | string[] = "";
  @Element() el: HTMLElement;
  @State() selectedTab: number = 0;

  extractData(data: string | string[]) {
    try {
      if (typeof data === "string") {
        const parsedData = JSON.parse(data);
        if (isStringArray(parsedData))
          return parsedData;
        throw new Error();
      }
    } catch (e) {
      console.error(
        `Expected a stringified array of strings, e.g.
        \n'["Scala", "Kotlin"]'
        \nGot '${data}'. Setting default numeric values...`
      );
      return Array.from(this.el.children).map((_, index) => `${index + 1}`);
    }
  }

  componentWillLoad() {
    this.dataLanguages = this.extractData(this.dataLanguages);
  }

  getChildren(): Array<HTMLElement> {
    return Array.from(this.el.children) as Array<HTMLElement>;
  }

  getSelectedElement(): HTMLElement {
    return this.el.children[this.selectedTab] as HTMLElement;
  }

  handleTabClick(newValue: number) {
    this.selectedTab = newValue;
  }

  render() {
    this.getChildren().map(slot => slot.classList.add("hidden"));
    this.getSelectedElement().classList.remove("hidden");

    return (
      <Host>
        {this.getChildren().map((_, index) => (
          <button class={index === this.selectedTab ? 'active' : ''} onClick={() => this.handleTabClick(index)}>
            {this.dataLanguages[index]}
          </button>
        ))}
        <slot></slot>
      </Host>
    );
  }
}
