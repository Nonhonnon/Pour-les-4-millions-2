const institutions = [
  { name: "Présidence de la République", category: "executif", tag: "Exécutif", mark: "PR", description: "Le Président de la République est le chef de l’État. Il veille au respect de la Constitution et représente la Nation.", head: "Brice Clotaire Oligui Nguema", role: "Président de la République", source: "https://presidence.ga/" },
  { name: "Gouvernement", category: "executif", tag: "Exécutif", mark: "G", description: "Il conduit la politique de la Nation et coordonne l’action des ministères et de l’administration centrale.", head: "Président de la République", role: "Chef du Gouvernement (selon la communication officielle consultée)", source: "https://presidence.ga/" },
  { name: "Assemblée nationale", category: "legislatif", tag: "Législatif", mark: "AN", description: "Chambre parlementaire qui participe au vote de la loi, au contrôle de l’action gouvernementale et au débat public.", head: "Président(e) de l’Assemblée nationale", role: "Nom à confirmer sur le site officiel", source: "https://www.assemblee-nationale.ga/" },
  { name: "Sénat", category: "legislatif", tag: "Législatif", mark: "S", description: "Chambre parlementaire participant à l’examen des textes et à la représentation des collectivités territoriales.", head: "Président(e) du Sénat", role: "Nom à confirmer sur le site officiel", source: "https://www.senat.ga/" },
  { name: "Cour constitutionnelle", category: "justice", tag: "Justice & droit", mark: "CC", description: "Elle veille à la conformité des lois à la Constitution et intervient dans le contrôle des élections et référendums.", head: "Président(e) de la Cour constitutionnelle", role: "Nom à confirmer sur le site officiel", source: "https://www.courconstitutionnelle.ga/" },
  { name: "Cour de cassation", category: "justice", tag: "Justice & droit", mark: "CJ", description: "La plus haute juridiction de l’ordre judiciaire, elle contrôle l’application du droit par les juridictions inférieures.", head: "Premier / Première président(e)", role: "Nom à confirmer auprès du ministère de la Justice", source: "https://justice.gouv.ga/" },
  { name: "Conseil d’État", category: "justice", tag: "Justice & droit", mark: "CE", description: "Juridiction suprême de l’ordre administratif, il connaît notamment des litiges impliquant l’administration.", head: "Président(e) du Conseil d’État", role: "Nom à confirmer auprès du ministère de la Justice", source: "https://justice.gouv.ga/" },
  { name: "Cour des comptes", category: "controle", tag: "Contrôle public", mark: "CdC", description: "Elle contrôle l’exécution des budgets publics et contribue à la bonne gestion des deniers de l’État.", head: "Premier / Première président(e)", role: "Nom à confirmer sur le site officiel", source: "https://www.ccomptes.ga/" },
  { name: "Conseil économique, social, environnemental et culturel", category: "controle", tag: "Conseil consultatif", mark: "CESEC", description: "Instance consultative qui éclaire les pouvoirs publics sur les questions économiques, sociales, environnementales et culturelles.", head: "Président(e) du Conseil", role: "Nom à confirmer auprès de l’institution", source: "https://gouvernement.ga/" },
  { name: "Médiateur de la République", category: "controle", tag: "Droits & médiation", mark: "MR", description: "Il facilite le règlement amiable de différends entre les citoyens et les services publics, et contribue à la défense des droits.", head: "Pr. Guy Rossatanga-Rignault", role: "Médiateur de la République, Défenseur des droits (nomination annoncée le 15 octobre 2026)", source: "https://presidence.ga/2026/10/15/8728/" },
  { name: "Commission nationale des droits de l’Homme", category: "controle", tag: "Droits humains", mark: "CNDH", description: "Institution nationale chargée de promouvoir et protéger les droits humains et les libertés fondamentales.", head: "Président(e) de la Commission", role: "Nom à confirmer auprès de l’institution", source: "https://gouvernement.ga/" },
  { name: "Autorité de régulation des communications électroniques et des postes", category: "controle", tag: "Régulation", mark: "ARCEP", description: "Elle régule les secteurs des communications électroniques et des services postaux, et veille au respect des règles applicables.", head: "Président(e) du Conseil de régulation", role: "Célestin Kadjidja (source de presse, à revérifier)", source: "https://www.arcep.ga/" },
  { name: "Commission électorale", category: "controle", tag: "Vie démocratique", mark: "CE", description: "Les organes chargés des élections organisent et supervisent les opérations électorales conformément aux textes en vigueur.", head: "Autorité électorale compétente", role: "Organisation et dénomination à vérifier selon les textes en vigueur", source: "https://www.interieur.gouv.ga/" },
  { name: "Ministères et administrations centrales", category: "executif", tag: "Administration", mark: "MA", description: "Les ministères préparent et mettent en œuvre les politiques publiques dans leurs domaines : santé, éducation, finances, infrastructures et autres.", head: "Ministre de chaque département", role: "La composition évolue ; consulter la dernière annonce officielle", source: "https://presidence.ga/" },
  { name: "Gouvernorats et collectivités locales", category: "controle", tag: "Territoires", mark: "GL", description: "Les services déconcentrés et les collectivités territoriales assurent le relais de l’action publique dans les provinces, départements et communes.", head: "Gouverneur / exécutif local", role: "Les titulaires varient selon le territoire et les nominations", source: "https://gouvernement.ga/" }
];

const grid = document.querySelector("#institution-grid");
if (grid) {
  const search = document.querySelector("#search");
  const count = document.querySelector("#results-count");
  const empty = document.querySelector("#empty-state");
  const filters = [...document.querySelectorAll(".filter")];
  let activeFilter = "toutes";

  function render() {
    const term = search.value.trim().toLocaleLowerCase("fr");
    const matches = institutions.filter((item) => {
      const categoryMatch = activeFilter === "toutes" || item.category === activeFilter;
      const searchMatch = `${item.name} ${item.description} ${item.tag} ${item.head}`.toLocaleLowerCase("fr").includes(term);
      return categoryMatch && searchMatch;
    });
    grid.innerHTML = matches.map((item) => `
      <article class="institution-card">
        <div class="card-top"><span class="institution-mark" aria-hidden="true">${item.mark}</span><span class="card-tag">${item.tag}</span></div>
        <h3>${item.name}</h3><p class="card-description">${item.description}</p>
        <div class="card-leader"><span>À LA TÊTE</span><strong>${item.head}</strong><small>${item.role}</small></div>
        <a class="card-link" href="${item.source}" target="_blank" rel="noopener">Consulter la source <span aria-hidden="true">↗</span></a>
      </article>`).join("");
    count.textContent = `${matches.length} institution${matches.length > 1 ? "s" : ""} affichée${matches.length > 1 ? "s" : ""}`;
    empty.hidden = matches.length !== 0;
  }

  search.addEventListener("input", render);
  filters.forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    render();
  }));
  render();
}

const updateDate = document.querySelector("#update-date");
if (updateDate) updateDate.textContent = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
