import { LitElement, html, css } from "lit";

export class UseCaseFilter extends LitElement {
  constructor() {
    super();
    this.filters = [];
    this.selectedFilters = [];
  }

  static get properties() {
    return {
      filters: { type: Array }, // Array of available filter options
      selectedFilters: { type: Array }, // Array of currently selected filters
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }

      .filter-section {
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
        padding: var(--ddd-spacing-3);
        box-shadow: var(--ddd-boxShadow-sm);
        margin-bottom: var(--ddd-spacing-4);
      }

      .filter-section h2 {
        font-size: var(--ddd-font-size-l);
        margin-bottom: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-coalyGray);
      }

      .filter-option {
        display: flex;
        align-items: center;
        margin-bottom: var(--ddd-spacing-2);
      }

      .filter-option input {
        margin-right: var(--ddd-spacing-2);
      }

      .reset-button {
        display: block;
        margin-top: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-skyBlue);
        color: white;
        border: none;
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-m);
        font-weight: bold;
        transition: background-color 0.3s ease;
      }

      .reset-button:hover {
        background-color: var(--ddd-theme-default-slateGray);
      }
    `;
  }

  render() {
    return html`
      <div class="filter-section">
        <h2>Filters</h2>
        ${this.filters.map(
          (filter) => html`
            <label class="filter-option">
              <input
                type="checkbox"
                value="${filter}"
                .checked="${this.selectedFilters.includes(filter)}"
                @change="${this._handleFilterChange}"
              />
              ${filter}
            </label>
          `
        )}
        <button class="reset-button" @click="${this._resetFilters}">
          Reset Filters
        </button>
      </div>
    `;
  }

  _handleFilterChange(e) {
    const filter = e.target.value;
    if (e.target.checked) {
      this.selectedFilters = [...this.selectedFilters, filter];
    } else {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    }

    // Dispatch a custom event with the updated selected filters
    this.dispatchEvent(
      new CustomEvent("filters-changed", {
        detail: { selectedFilters: this.selectedFilters },
        bubbles: true,
        composed: true,
      })
    );
  }

  _resetFilters() {
    this.selectedFilters = [];
    this.dispatchEvent(
      new CustomEvent("filters-changed", {
        detail: { selectedFilters: this.selectedFilters },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get tag() {
    return "use-case-filter";
  }
}

customElements.define(UseCaseFilter.tag, UseCaseFilter);
