// Function to fetch and load element data from JSON file
async function loadElementData() {
    const response = await fetch('elements.json'); // Update with the path to your JSON file
    const data = await response.json();
    return data.elements;
  }
  
  // Create a map to hold the element data for quick access
  let elementData = {};
  
  loadElementData().then(elements => {
    elements.forEach(element => {
      elementData[element.symbol] = element;
    });
  
    // Attach click event listeners to elements
    document.querySelectorAll('.element, .d-block, .p-blockelements').forEach(el => {
      el.addEventListener('click', () => {
        const elementSymbol = el.textContent.trim();
        showElementInfo(elementSymbol);
      });
    });
  });

  
  document.getElementById("Button").addEventListener("Onclick", function() {
    window.location.href = "https://bikrammondal5.github.io/Mendeleev-table/"; 
  });


  
  // Function to show the modal with element info
  function showElementInfo(elementSymbol) {
    const element = elementData[elementSymbol];
    if (!element) return; // Skip if no data is found
    
    // Set the content of the modal
    const modalContent = `
      <h2>${element.name} (${element.symbol})</h2>
      <p><strong>Atomic Number:</strong> ${element.number}</p>
      <p><strong>Atomic Weight:</strong> ${element.atomic_mass}</p>
      <p><strong>Category:</strong> ${element.category}</p>
      <p><strong>Phase:</strong> ${element.phase}</p>
      <p><strong>Density:</strong> ${element.density} g/cm³</p>
      <p><strong>Melting Point:</strong> ${element.melt} K</p>
      <p><strong>Boiling Point:</strong> ${element.boil} K</p>
      <p><strong>Discovered By:</strong> ${element.discovered_by}</p>
      <p><strong>Summary:</strong> ${element.summary}</p>
      <img src="${element.bohr_model_image}" alt="${element.name} Bohr Model" style="width: 100px; height: auto;"/>
      <a href="${element.bohr_model_3d}" target="_blank">3D Model</a>
      <button id="close-btn">Close</button>
    `;
    document.querySelector('.modal .modal-content').innerHTML = modalContent;
  
    // Show the modal
    document.querySelector('.main-container').style.filter = 'blur(10px)';
    document.querySelector('.modal').style.display = 'block';
    document.getElementById('heading').style.display = 'none';
    
    // Close the modal when clicking the close button
    document.getElementById('close-btn').addEventListener('click', () => {
      document.querySelector('.modal').style.display = 'none';
      document.getElementById('heading').style.display = 'block';
      document.querySelector('.main-container').style.filter = 'blur(0px)';
    });
  }
  
