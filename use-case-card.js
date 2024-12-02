import { LitElement, html, css } from "lit";

export class UseCaseCard extends LitElement {
  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.tags = [];
    this.image = "";
    this.demoLink = "";
    this.dateAdded = "";
    this.attributes = [];
    this.selected = false;
  }

  static get properties() {
    return {
      name: { type: String },
      description: { type: String },
      tags: { type: Array },
      image: { type: String },
      demoLink: { type: String },
      dateAdded: { type: Number },
      attributes: { type: Array },
      selected: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 300px;
        font-family: Arial, sans-serif;
      }

      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
      }

      .card img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }

      .content {
        padding: 16px;
        text-align: left;
      }

      .content h3 {
        font-size: 18px;
        margin: 0 0 8px 0;
        color: #333;
      }

      .content p {
        font-size: 14px;
        margin: 0 0 16px 0;
        color: #666;
        line-height: 1.5;
      }

      .tags {
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .tag {
        background-color: #e9ecef;
        color: #495057;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-top: 1px solid #eee;
        background-color: #f9f9f9;
      }

      .actions a {
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
        color: #007bff;
        transition: color 0.3s ease;
      }

      .actions a:hover {
        color: #0056b3;
      }

      .select-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: ${this.selected ? "#007bff" : "#28a745"};
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }

      .select-button:hover {
        background-color: ${this.selected ? "#0056b3" : "#218838"};
      }

      :host([selected]) .card {
        border-color: #007bff;
        box-shadow: 0px 4px 6px rgba(0, 123, 255, 0.3);
      }

      :host([selected]) .select-button {
        background-color: #0056b3;
      }
    `;
  }

  render() {
    return html`
      <div class="card" tabindex="0">
        <img
          src="${this.image || 'https://via.placeholder.com/300x150'}"
          alt="${this.name || 'Image unavailable'}"
        />
        <div class="content">
          <h3>${this.name || "Untitled"}</h3>
          <p>${this.description || "No description provided."}</p>
          <div class="tags">
            ${this.tags.map(
              (tag) => html`<span class="tag">${tag}</span>`
            )}
          </div>
        </div>
        <div class="actions">
          <a href="${this.demoLink}" target="_blank">Demo ></a>
          <button
            class="select-button"
            @click="${this._toggleSelect}"
          >
            ${this.selected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    `;
  }

  _toggleSelect() {
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent("use-case-selected", {
        detail: {
          selected: this.selected,
          name: this.name,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get tag() {
    return "use-case-card";
  }
}

customElements.define(UseCaseCard.tag, UseCaseCard);
