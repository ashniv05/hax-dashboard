import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-accent);
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--ddd-spacing-4);
        padding-bottom: var(--ddd-spacing-2);
        border-bottom: 1px solid var(--ddd-theme-default-gray);
      }

      header h1 {
        margin: 0;
        font-size: var(--ddd-font-size-xl);
        color: var(--ddd-theme-primary);
      }

      .filters {
        margin-bottom: var(--ddd-spacing-4);
      }

      .filters label {
        display: flex;
        align-items: center;
        margin-bottom: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-m);
      }

      .filters input {
        margin-right: var(--ddd-spacing-2);
      }

      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--ddd-spacing-4);
      }

      .results-count {
        font-size: var(--ddd-font-size-m);
        margin-bottom: var(--ddd-spacing-2);
      }
    `;
  }

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      selectedFilters: { type: Array },
      resultsCount: { type: Number },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.resultsCount = 0;
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch("./lib/use-case-data.json");
      if (response.ok) {
        const data = await response.json();
        this.useCases = data.data;
        this.filteredUseCases = [...this.useCases];
        this.resultsCount = this.filteredUseCases.length;
      }
    } catch (error) {
      console.error("Error fetching use-case data:", error);
    }
  }

  filterUseCases() {
    if (this.selectedFilters.length === 0) {
      this.filteredUseCases = [...this.useCases];
    } else {
      this.filteredUseCases = this.useCases.filter((useCase) =>
        this.selectedFilters.every((filter) => useCase.tags.includes(filter))
      );
    }
    this.resultsCount = this.filteredUseCases.length;
  }

  handleFilterChange(event) {
    const filter = event.target.value;
    if (event.target.checked) {
      this.selectedFilters = [...this.selectedFilters, filter];
    } else {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    }
    this.filterUseCases();
  }

  render() {
    return html`
      <header>
        <h1>Use Cases Dashboard</h1>
        <div class="results-count">${this.resultsCount} Results</div>
      </header>

      <div class="filters">
        <h2>Filters</h2>
        ${this.generateFilters()}
      </div>

      <div class="results">
        ${this.filteredUseCases.map(
          (useCase) => html`
            <use-case-card
              title="${useCase.name}"
              description="${useCase.description}"
              image="${useCase.image}"
              demoLink="${useCase.demo_link}"
            ></use-case-card>
          `
        )}
      </div>
    `;
  }

  generateFilters() {
    const uniqueTags = [
      ...new Set(this.useCases.flatMap((useCase) => useCase.tags)),
    ];
    return uniqueTags.map(
      (tag) => html`
        <label>
          <input
            type="checkbox"
            value="${tag}"
            @change="${this.handleFilterChange}"
          />
          ${tag}
        </label>
      `
    );
  }

  static get tag() {
    return "use-case-dashboard";
  }
}

customElements.define(UseCaseDashboard.tag, UseCaseDashboard);
