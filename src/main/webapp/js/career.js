/**
 * BurWeb - Career Page JavaScript
 * Loads and displays job opportunities from JSON data
 */

// Variables to store data
let jobsData = [];
let shopsData = [];

// Variables to store current job info
let currentJobId = null;
let currentJobName = '';
let currentShopId = null;
let currentLocation = '';

// When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load common components if available
    if (typeof initCommonComponents === 'function') {
        initCommonComponents();
    }
    
    // Load shops and job opportunities
    loadShopsAndJobs();
    
    // Set up modal event listeners
    setupModal();
});

/**
 * Loads shops, cities and job opportunities from the server
 */
async function loadShopsAndJobs() {
    try {
        // Obtener tiendas usando la función del API
        const shops = await getShops();
        if (!shops || shops.length === 0) {
            throw new Error('No se pudieron cargar los datos de tiendas');
        }

        // Obtener ciudades usando la función del API
        const cities = await getCities();
        if (!cities || cities.length === 0) {
            throw new Error('No se pudieron cargar los datos de ciudades');
        }

        // Enriquecer las tiendas con los nombres de las ciudades
        shopsData = shops.map(shop => {
            // Encontrar la ciudad correspondiente al id_city de la tienda
            const city = cities.find(city => city.id_city === shop.id_city);
            return {
                ...shop,
                city_name: city ? city.name : 'Ciudad desconocida'
            };
        });

        console.log('Tiendas con información de ciudad cargadas:', shopsData);

        // Obtener ofertas de trabajo usando la función del API
        const jobOffers = await getJobOffers();

        // Verificar que hayamos obtenido datos válidos
        if (!jobOffers || jobOffers.length === 0) {
            throw new Error('No se encontraron ofertas de trabajo');
        }

        console.log('Ofertas de trabajo cargadas desde la API:', jobOffers);

        // Renderizar las tarjetas de trabajo con los datos obtenidos
        renderJobCards(jobOffers);
    } catch (error) {
        console.error('Error loading data:', error);
        showJobLoadingError();
    }
}

/**
 * Gets shop location by shop ID
 * @param {number} shopId - Shop ID
 * @returns {string} Shop location or default text
 */
function getShopLocation(shopId) {
    // Find the shop with matching ID
    const shop = shopsData.find(shop => shop.id_shop === shopId);

    // If shop found, return the city name with a default location format
    if (shop && shop.city_name) {
        return `${shop.city_name}, TX`;
    }

    return "Location unavailable";
}

/**
 * Gets shop contact info by shop ID
 * @param {number} shopId - Shop ID
 * @returns {Object} Shop contact info object
 */
function getShopContactInfo(shopId) {
    // Find the shop with matching ID
    const shop = shopsData.find(shop => shop.id_shop === shopId);
    
    if (shop) {
        return {
            phone: shop.phone_number,
            email: shop.email
        };
    }
    
    return {
        phone: "Contact unavailable",
        email: "contact@burweb.com"
    };
}

/**
 * Renders job cards based on the data
 * @param {Array} jobs - Array of job objects
 */
function renderJobCards(jobs) {
    const container = document.getElementById('job-openings-list');
    
    // Clear loading indicator
    container.innerHTML = '';
    
    if (!jobs || jobs.length === 0) {
        container.innerHTML = '<p class="no-jobs">No job opportunities available at the moment. Please check back later.</p>';
        return;
    }
    
    // Create a card for each job
    jobs.forEach(job => {
        // Get shop location
        const location = getShopLocation(job.id_shop);
        
        // Create job card element
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.dataset.jobId = job.id_job_offer;
        
        // Truncate description for preview
        const shortDescription = truncateText(job.description, 150);
        
        // Generate card HTML
        jobCard.innerHTML = `
            <div class="job-card-header">
                <h3>${job.name}</h3>
                <span class="job-location">${location}</span>
            </div>
            <div class="job-card-body">
                <p>${shortDescription}</p>
                <button class="job-view-more">View Details</button>
            </div>
        `;
        
        // Add click event to view job details
        jobCard.addEventListener('click', function() {
            openJobDetails(job);
        });
        
        // Add to container
        container.appendChild(jobCard);
    });
}

/**
 * Opens the job details modal
 * @param {Object} job - Job object with details
 */
function openJobDetails(job) {
    const modal = document.getElementById('job-modal');
    const modalBody = document.getElementById('job-modal-body');
    
    // Get shop location and contact info
    const location = getShopLocation(job.id_shop);
    const contactInfo = getShopContactInfo(job.id_shop);
    
    // Store job info for later use
    currentJobId = job.id_job_offer;
    currentJobName = job.name;
    currentShopId = job.id_shop;
    currentLocation = location;
    
    // Parse requirements from description
    const { description, requirements } = parseJobDescription(job.description);
    
    // Set modal content
    modalBody.innerHTML = `
        <div class="job-modal-header">
            <h2>${job.name}</h2>
            <p>Location: ${location}</p>
        </div>
        <div class="job-modal-details">
            <h3>Job Description</h3>
            <p>${description}</p>
            
            <h3>Requirements</h3>
            <ul>
                ${requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
            
            <h3>What We Offer</h3>
            <ul>
                <li>Competitive salary and benefits package</li>
                <li>Professional development opportunities</li>
                <li>Friendly and collaborative work environment</li>
                <li>Employee discounts on our products</li>
                <li>Flexible work schedule (for applicable positions)</li>
            </ul>
            
            <h3>Contact Information</h3>
            <p>For more information about this position, please contact us at:</p>
            <p><strong>Phone:</strong> ${contactInfo.phone}</p>
            <p><strong>Email:</strong> ${contactInfo.email}</p>
        </div>
    `;
    
    // Show apply button in footer
    const modalFooter = document.querySelector('.job-modal-footer');
    modalFooter.style.display = 'block';
    
    // Setup apply button
    const applyButton = document.getElementById('apply-button');
    applyButton.onclick = function() {
        // Show the application form
        //showApplicationForm();
        //KISS
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfeRRpIT96xGKm4VWtej1TWN-7Y39fqrYMn75t4SENnVbOogA/viewform?usp=dialog');
    };
    
    // Show modal
    modal.style.display = 'block';
    
    // Disable scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
}
//Disabled function
/**
 * Shows the job application form in the modal
 */
function showApplicationForm() {
    const modalBody = document.getElementById('job-modal-body');
    const modalFooter = document.querySelector('.job-modal-footer');
    
    // Create application form
    modalBody.innerHTML = `
        <div class="job-modal-header">
            <h2>Apply for ${currentJobName}</h2>
            <p>Location: ${currentLocation}</p>
        </div>
        <div class="job-application-form">
            <form id="job-application-form">
                <div class="form-group">
                    <label for="full-name">Full Name*</label>
                    <input type="text" id="full-name" name="full-name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address*</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number*</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                
                <div class="form-group">
                    <label for="resume">Resume/CV*</label>
                    <div class="file-input-wrapper">
                        <label for="resume" class="file-input-label">Choose File</label>
                        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
                        <span class="file-name" id="file-name-display">No file chosen</span>
                    </div>
                    <div class="form-hint">Accepted formats: PDF, DOC, DOCX (Max 5MB)</div>
                </div>
                
                <div class="form-group">
                    <label for="cover-letter">Cover Letter</label>
                    <textarea id="cover-letter" name="cover-letter" placeholder="Tell us why you're interested in this position and why you would be a good fit..."></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="form-cancel-btn" id="cancel-application">Back to Job Details</button>
                    <button type="submit" class="form-submit-btn">Submit Application</button>
                </div>
            </form>
        </div>
    `;
    
    // Hide the apply button
    modalFooter.style.display = 'none';
    
    // Add event listeners for the form
    document.getElementById('job-application-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('cancel-application').addEventListener('click', function() {
        // Return to job details
        openJobDetails({
            id_job_offer: currentJobId,
            id_shop: currentShopId,
            name: currentJobName
        });
        
        // Show the apply button again
        modalFooter.style.display = 'block';
    });
    
    // Add event listener for file input to show filename
    document.getElementById('resume').addEventListener('change', function(e) {
        const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
        document.getElementById('file-name-display').textContent = fileName;
    });
}

/**
 * Handles the job application form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    const modalBody = document.getElementById('job-modal-body');
    
    // Show loading state
    modalBody.innerHTML = `
        <div class="job-modal-header">
            <h2>Submitting Application</h2>
        </div>
        <div class="form-success-message">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Please wait while we submit your application...</p>
        </div>
    `;
    
    setTimeout(() => {
        // Show success message
        modalBody.innerHTML = `
            <div class="job-modal-header">
                <h2>Application Submitted</h2>
            </div>
            <div class="form-success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your application for the <strong>${currentJobName}</strong> position has been submitted successfully.</p>
                <p>We will review your application and contact you soon.</p>
                <button id="close-success">Close</button>
            </div>
        `;
        
        // Add event listener to close button
        document.getElementById('close-success').addEventListener('click', closeModal);
    }, 1500);
}

/**
 * Parses job description to extract requirements
 * @param {string} fullDescription - Full job description text
 * @returns {Object} Object with separated description and requirements
 */
function parseJobDescription(fullDescription) {
    // Check if description contains "Requirements:" text
    const reqIndex = fullDescription.indexOf('Requirements:');
    
    if (reqIndex !== -1) {
        // Split description and requirements
        const description = fullDescription.substring(0, reqIndex).trim();
        const requirementsText = fullDescription.substring(reqIndex + 12).trim();
        
        // Split requirements into array by periods or commas
        const requirements = requirementsText.split(/\.\s+|\,\s+/)
            .map(req => req.trim())
            .filter(req => req.length > 0)
            .map(req => req.endsWith('.') ? req : req + '.');
        
        return { description, requirements };
    }
    
    // If "Requirements:" not found, return original description and empty requirements
    return { 
        description: fullDescription, 
        requirements: ['No specific requirements listed.'] 
    };
}

/**
 * Sets up the modal events (close button, etc.)
 */
function setupModal() {
    const modal = document.getElementById('job-modal');
    const closeButton = document.querySelector('.close-modal');
    
    // Close on X button click
    closeButton.addEventListener('click', closeModal);
    
    // Close on click outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

/**
 * Closes the job details modal
 */
function closeModal() {
    const modal = document.getElementById('job-modal');
    modal.style.display = 'none';
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

/**
 * Shows an error message when jobs can't be loaded
 */
function showJobLoadingError() {
    const container = document.getElementById('job-openings-list');
    container.innerHTML = `
        <div class="job-loading-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>There was an error loading job opportunities. Please try again later.</p>
            <button onclick="loadShopsAndJobs()">Retry</button>
        </div>
    `;
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis if needed
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}