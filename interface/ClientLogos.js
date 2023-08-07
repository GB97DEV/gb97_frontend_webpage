const ClientsLogos = [
   {
      logo: '0491512059001',
      name: 'Asociación de economía solidaria los pastos'
   },
   {
      logo: '0591731270001',
      name: 'Asociación De Confección Textil Fuerza Productiva De Cotopaxi'
   },
   {
      logo: '0603342403001',
      name: 'Ortiz Remache Fanny Leonor'
   },
   {
      logo: '1191769372001',
      name: 'ASOTELIERSUR'
   },
   {
      logo: '1309999751001',
      name: 'PINARGOTE ALAVA ANGELICA MARIA'
   },
   {
      logo: '1705492476001',
      name: 'FLORES FLORES BERTHA ALICIA'
   },
   {
      logo: '1713912424001',
      name: 'María Mercedes Villa Lasso'
   },
   {
      logo: '1714740378001',
      name: 'Carlos Herrera'
   },
   {
      logo: '1715770879001',
      name: 'Limones Lopez Aida Maria',
      products: ['IMG-01','IMG-02','IMG-03','IMG-04']
   },
   {
      logo: '1717598708001',
      name: 'Sinchiguano Basantes Diana Gabriela'
   },
   {
      logo: '1717916041001',
      name: 'Sanchez Chasi Viviana Paola'
   },
   {
      logo: '1792136202001',
      name: 'Punto Ecuador'
   },
   {
      logo: '1792516293001',
      name: 'ASOFONOR'
   },
   {
      logo: '1792578809001',
      name: 'ASOUNBUPRO'
   },
   {
      logo: '1792579864001',
      name: 'ASOTEXIDEAS'
   },
   {
      logo: '1792588278001',
      name: 'ASOTEXSUR'
   },
   {
      logo: '1792625718001',
      name: 'ASOPROTEXDIJUN'
   },
   {
      logo: '1792653290001',
      name: 'ASOPROTEXCOSDES'
   },
   {
      logo: '1792654262001',
      name: 'Asociación De Producción Textil Amo Ecuador'
   },
   {
      logo: '1792654416001',
      name: 'ASOPROTEXCIEDO'
   },
   {
      logo: '1792657946001',
      name: 'ASOPROTEXJUN'
   },
   {
      logo: '1792765374001',
      name: 'ASOTEXHUMANO'
   },
   {
      logo: '1891766234001',
      name: 'ASOPRONUEZA'
   },
   //Sin logo
   {
      name: 'Baque Perez Daysi Marilu'
   },
   {
      name: 'QUIMIS MOSQUERA SANDRA RAMONA'
   },
   {
      name: 'BALZECA GARCIA DIANA CAROLINA'
   },
   {
      name: 'Asociación De Producción Textil Doristex EPS'
   },
   {
      name: 'Lugmaña Puma Norma Isabel'
   },
   {
      name: 'Zambrano Solorzano Marjorie Marlen'
   },
   {
      name: 'ASOTEXSUYANA'
   },
   {
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


















