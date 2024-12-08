import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ddd-font-navigation);
      background-color: var(--ddd-theme-default-background);
      color: var(--ddd-primary-6);
    }
    .dashboard {
      display: flex;
      flex-direction: row;
    }
    .filters {
      flex: 1;
      margin-right: var(--ddd-spacing-2) 0 0 0;
    }
    .cards {
      flex: 3;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  `;

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      filters: { type: Array },
      results: { type: Number },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.results = 0;
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch("./lib/use-case-data.json");
      if (response.ok) {
        const data = await response.json();
        this.useCases = data.data;
        this.filteredUseCases = [...this.useCases];
        this.results = this.filteredUseCases.length;
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
    this.results = this.filteredUseCases.length;
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
        <div class="results">${this.resultsCount} Results</div>
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
