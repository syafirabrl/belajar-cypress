describe('Testing Sort By and Search Feature', () => {
    beforeEach(() => {
      // Melakukan setup sebelum setiap pengujian (contoh: membuka halaman website)
      cy.visit('/products') // Ganti dengan URL halaman produk Anda
    })
  
    it('Should display products in the correct order after sorting', () => {
      // Memilih opsi pengurutan (contoh: dari harga terendah ke tertinggi)
      cy.get('#sort-by-select').select('Price: Low to High') // Ganti dengan ID atau selector elemen opsi pengurutan
  
      // Memeriksa apakah produk ditampilkan dalam urutan yang benar
      cy.get('.product-price') // Ganti dengan class atau selector elemen harga produk
        .should('have.length', 3) // Ganti dengan jumlah produk yang diharapkan
        .then(prices => {
          const sortedPrices = Array.from(prices, el => parseFloat(el.innerText.slice(1)))
          const isSorted = sortedPrices.slice(1).every((price, index) => price >= sortedPrices[index])
          expect(isSorted).to.be.true
        })
    })
  
    it('Should display search results correctly', () => {
      const searchTerm = 'cypress' // Ganti dengan kata kunci pencarian yang relevan
  
      // Memasukkan kata kunci pencarian
      cy.get('#search-input').type(searchTerm) // Ganti dengan ID atau selector elemen input pencarian
  
      // Memeriksa apakah hasil pencarian sesuai dengan kata kunci
      cy.get('.product-item') // Ganti dengan class atau selector elemen produk
        .should('have.length', 2) // Ganti dengan jumlah produk yang diharapkan
        .each(item => {
          cy.wrap(item)
            .should('contain', searchTerm)
        })
    })
  })
  