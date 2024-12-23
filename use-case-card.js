import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { LitElement, html, css } from "lit";

export class UseCaseCard extends DDDSuper(LitElement) {

constructor() {
    super();
    this.id = "";
    this.title = "";
    this.description = "";
    this.imageURL = "";
    this.demoLink = "";
    this.selected = false;
    this.useCase = {};
  }

  static get properties() {
    return {
        id: { type: String },
        tag: { type: String },
        title: { type: String },
        description: { type: String },
        imageURL: { type: String },
        demo: { type: String },
        demoLink: { type: String },
        selected: { type: Boolean, reflect: true },
        useCase: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        /* cards */
        .use-case-card {
          background: var(--ddd-theme-default-slateMaxLight);
          border-radius: var(--ddd-radius-md);
          border: var(--ddd-border-xs) solid  var(--ddd-theme-default-potentialMidnight);
          box-shadow: var(--ddd-boxShadow-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--ddd-spacing-4);
          gap: var(--ddd-spacing-3);
        }
        .use-case-card.selected {
          border: 2px solid var(--ddd-theme-default-potentialMidnight);
        }
        .use-case-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          background: var(--ddd-theme-default-accent);
        }
        .use-case-card h3 {
          font-size: var(--ddd-font-size-xxs);
          font-weight: var(--ddd-font-weight-bold);
          color:  var(--ddd-theme-default-potentialMidnight);
          margin: var(--ddd-spacing-2) 0 0 0;
        }
        .use-case-card p {
          font-size: var(--ddd-font-size-xs);
          color:  var(--ddd-theme-default-potentialMidnight);
          line-height: var(--ddd-lh-150);
          margin: 0 0 var(--ddd-spacing-4) 0;
        }
        .use-case-card button {
          background-color: var(--ddd-theme-default-potentialMidnight);
          color: var(--ddd-theme-default-slateMaxLight);
          border: var(-ddd-border-md);
          border-radius: var(--ddd-radius-xs);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-xs);
          cursor: pointer;
        }

        .use-case-card button:hover {
          background-color: var(--ddd-theme-default-slateGray);
        }
      `,
    ];
  }

   // button click
   handleSelectClick() {
    console.log(`Selected ${this.title}`); 

    this.dispatchEvent(
      new CustomEvent("select", {
        detail: this.useCase,
        bubbles: true,
        composed: true,
      })
    );
  
    if (this.demoLink) {
      window.open(this.demoLink, "_blank");
    } else {
      console.log("Demo link not available.");
    }
  }

  render() {
    return html`
      <div class="use-case-card" ?selected="${this.selected}">
      <img src="${this.imageURL}" alt="Image for ${this.title}" />
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <button @click="${this.handleSelectClick}">
          ${this.selected ? "Selected" : "Select"}
        </button>
      </div>
  `;
  }

  static get tag() {
    return "use-case-card";
  }
}
customElements.define(UseCaseCard.tag, UseCaseCard);
