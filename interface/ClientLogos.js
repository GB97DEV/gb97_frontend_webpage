const ClientsLogos = [
   {
      organizationId: '0491512059001',
      logo: '0491512059001',
      name: 'Asociación de economía solidaria los pastos'
   },
   {
      organizationId: '0591731270001',
      logo: '0591731270001',
      name: 'Asociación De Confección Textil Fuerza Productiva De Cotopaxi'
   },
   {
      organizationId: '0603342403001',
      logo: '0603342403001',
      name: 'Ortiz Remache Fanny Leonor'
   },
   {
      organizationId: '1191769372001',
      logo: '1191769372001',
      name: 'ASOTELIERSUR'
   },
   {
      organizationId: '1309999751001',
      logo: '1309999751001',
      name: 'PINARGOTE ALAVA ANGELICA MARIA'
   },
   {
      organizationId: '1705492476001',
      logo: '1705492476001',
      name: 'FLORES FLORES BERTHA ALICIA'
   },
   {
      organizationId: '1713912424001',
      logo: '1713912424001',
      name: 'María Mercedes Villa Lasso'
   },
   {
      organizationId: '1714740378001',
      logo: '1714740378001',
      name: 'Carlos Herrera'
   },
   {
      organizationId: '1715770879001',
      logo: '1715770879001',
      name: 'Limones Lopez Aida Maria',
      products: ['IMG-01','IMG-02','IMG-03','IMG-04']
   },
   {
      organizationId: '1717598708001',
      logo: '1717598708001',
      name: 'Sinchiguano Basantes Diana Gabriela'
   },
   {
      organizationId: '1717916041001',
      logo: '1717916041001',
      name: 'Sanchez Chasi Viviana Paola'
   },
   {
      organizationId: '1792136202001',
      logo: '1792136202001',
      name: 'Punto Ecuador'
   },
   {
      organizationId: '1792516293001',
      logo: '1792516293001',
      name: 'ASOFONOR'
   },
   {
      organizationId: '1792578809001',
      logo: '1792578809001',
      name: 'ASOUNBUPRO'
   },
   {
      organizationId: '1792579864001',
      logo: '1792579864001',
      name: 'ASOTEXIDEAS'
   },
   {
      organizationId: '1792588278001',
      logo: '1792588278001',
      name: 'ASOTEXSUR'
   },
   {
      organizationId: '1792625718001',
      logo: '1792625718001',
      name: 'ASOPROTEXDIJUN',
      products: ['IMG-01','IMG-02','IMG-03','IMG-04','IMG-05','IMG-06','IMG-07','IMG-08','IMG-09']
   },
   {
      organizationId: '1792653290001',
      logo: '1792653290001',
      name: 'ASOPROTEXCOSDES'
   },
   {
      organizationId: '1792654262001',
      logo: '1792654262001',
      name: 'Asociación De Producción Textil Amo Ecuador'
   },
   {
      organizationId: '1792654416001',
      logo: '1792654416001',
      name: 'ASOPROTEXCIEDO'
   },
   {
      organizationId: '1792657946001',
      logo: '1792657946001',
      name: 'ASOPROTEXJUN'
   },
   {
      organizationId: '1792765374001',
      logo: '1792765374001',
      name: 'ASOTEXHUMANO'
   },
   {
      organizationId: '1891766234001',
      logo: '1891766234001',
      name: 'ASOPRONUEZA'
   },
   //Sin logo
   {
      organizationId: '1304330077001',
      name: 'Baque Perez Daysi Marilu'
   },
   {
      organizationId: '1307174134001',
      name: 'Quimis Mosquera Sandra Ramona'
   },
   {
      organizationId: '1311962912001',
      name: 'Diana Carolina Balzeca García'
   },
   {
      organizationId: '1391833245001',
      name: 'Asociación De Producción Textil Doristex EPS'
   },
   {
      organizationId: '1710345818001',
      name: 'Lugmaña Puma Norma Isabel'
   },
   {
      organizationId: '1712664232001',
      name: 'Zambrano Solorzano Marjorie Marlen'
   },
   {
      organizationId: '1792794285001',
      name: 'ASOTEXSUYANA'
   },
   {
      organizationId: '1793046096001',
      name: 'ASOTEXARMO'
   },
]

const compareByName = (a, b) => {
   if (a.name < b.name) return -1;
   if (a.name > b.name) return 1;
   return 0;
 };

ClientsLogos.sort(compareByName);

export default ClientsLogos;


















