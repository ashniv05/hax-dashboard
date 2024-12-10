import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ddd-font-navigation, Arial, sans-serif);
      background-color: var(--ddd-theme-default-background, #f9f9f9);
      color: var(--ddd-primary-6, #333);
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: var(--ddd-primary-4, #007bff);
      color: var(--ddd-theme-default-white, #fff);
    }

    header h1 {
      font-size: 24px;
      margin: 0;
    }

    header .results {
      font-size: 18px;
    }

    .dashboard {
      display: flex;
      padding: 16px;
      gap: 20px;
    }

    .filters {
      flex: 1;
      background: var(--ddd-theme-default-white, #fff);
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .filters h2 {
      margin-top: 0;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 8px;
    }

    .filters label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      margin: 8px 0;
    }

    .filters input[type="checkbox"] {
      margin: 0;
    }

    .cards {
      flex: 3;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .tag-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .tag {
      background-color: #007bff;
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
    }

    .tag:hover {
      background-color: #0056b3;
    }
  `;

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      selectedFilters: { type: Array },
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
      this.useCases = [];
      this.filteredUseCases = [];
    }
  }

  filterUseCases() {
    if (this.selectedFilters.length === 0) {
      this.filteredUseCases = [...this.useCases];
    } else {
      this.filteredUseCases = this.useCases.filter((useCase) =>
        this.selectedFilters.every((filter) => useCase.tags?.includes(filter))
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
        <h1>New Journey</h1>
        <div class="results">${this.results} Results</div>
      </header>

      <div class="dashboard">
        <div class="filters">
          <h2>Template</h2>
          ${this.generateFilters()}
        </div>

        <div class="cards">
          ${this.filteredUseCases.map(
            (useCase) => html`
              <use-case-card
                title="${useCase.name}"
                description="${useCase.description}"
                demoLink="${useCase.demo_link}"
              ></use-case-card>
            `
          )}
        </div>
      </div>
    `;
  }

  generateFilters() {
    const uniqueTags = [
      ...new Set(this.useCases.flatMap((useCase) => useCase.tags || [])),
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
