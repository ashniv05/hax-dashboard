import { LitElement, html, css } from "lit";

class UseCaseFilter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--ddd-theme-default-white);
      padding: var(--ddd-spacing-6);
      border-radius: var(--ddd-radius-md);
      box-shadow: var(--ddd-boxShadow-sm);
      margin-bottom: var(--ddd-spacing-6);
    }

    h3 {
      margin: var(--ddd-spacing-2) 0 0 0;
      font-size: var(--ddd-font-size-s);
      font-weight: var(--ddd-font-weight-bold);
      border-bottom: var(--ddd-border-xs);
      padding-bottom: var(--ddd-spacing-2);
      color: var(--ddd-primary-4);
    }

    .filters {
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-4);
      margin-top: var(--ddd-spacing-4);
    }

    .filter-item {
      display: flex;
      align-items: center;
      gap: var(--ddd-spacing-4);
    }

    .filter-item input[type="checkbox"] {
      margin: var(--ddd-spacing-2) 0 0 0;
    }

    .filter-item label {
      font-size: var(--ddd-font-size-3xs);
      color: var(--ddd-primary-5);
    }
  `;

  static properties = {
    selectedFilters: { type: Array }, // array
  };

  constructor() {
    super();
    // filters
    this.filters = ["Portfolio", "Course", "Resume", "Blog", "Research Website"];
    this.selectedFilters = []; 
  }

  handleFilterChange(event) {
    const filter = event.target.value;

    if (event.target.checked) {
      // add filter to selectedFilters when checked
      this.selectedFilters = [...this.selectedFilters, filter];
    } else {
      // remove filter from selectedFilters when unchecked
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    }

    // updated filters
    this.dispatchEvent(
      new CustomEvent("filters-changed", {
        detail: this.selectedFilters,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div>
        <h3>Filters</h3>
        <div class="filters">
          ${this.filters.map(
            (filter) => html`
              <div class="filter-item">
                <input
                  type="checkbox"
                  value="${filter}"
                  ?checked="${this.selectedFilters.includes(filter)}"
                  @change="${this.handleFilterChange}"
                />
                <label>${filter}</label>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("use-case-filter", UseCaseFilter);
