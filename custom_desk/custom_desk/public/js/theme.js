frappe.boot ? apply_theme_if_enabled() : frappe.after_ajax(apply_theme_if_enabled);

function apply_theme_if_enabled() {
    frappe.db.get_single_value('Theme Settings', 'enabled').then(enabled => {
        if (!enabled) return;

        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'Theme Settings',
                name: 'Theme Settings'
            },
            callback(res) {
                if (res.message) {
                    apply_theme(res.message);
                }
            }
        });
    });
}

function apply_theme(doc) {
    remove_theme();

    const style = document.createElement('style');
    style.id = 'custom-theme-style';
    style.innerHTML = `
        :root {
            --primary-color: ${doc.primary_button_color || '#2490ef'};
            --secondary-color: ${doc.secondary_button_color || '#74808b'};
            --danger-color: ${doc.danger_button_color || '#e24c4c'};
            --light-color: ${doc.light_button_color || '#f4f5f6'};

            --sidebar-bg: ${doc.sidebar_background || '#ffffff'};
            --topbar-bg: ${doc.topbar_background || '#ffffff'};
            --card-bg: ${doc.card_background || '#ffffff'};
            --table-bg: ${doc.table_background || '#ffffff'};
            --page-bg: ${doc.background_color || '#f0f4f7'};

            --font-family: ${doc.font_family || 'Inter, sans-serif'};
            --label-color: ${doc.label_color || '#8d99a6'};
            --section-bg: ${doc.section_bg_color || '#ffffff'};
            --form-border: ${doc.form_border_color || '#d1d8dd'};
            --hover-color: ${doc.hover_color || '#f7f7f7'};

            --card-radius: ${doc.card_border_radius || '8px'};
            --card-shadow: ${doc.card_shadow_style || '0 1px 3px rgba(0,0,0,0.1)'};

            --page-head-bg: ${doc.page_head_background || '#ffffff'};
            --table-head-bg: ${doc.table_head_background || '#f7fafc'};
            --alt-row-bg: ${doc.alt_row_background || '#ffffff'};

            /* New Components & Customization */
            --btn-radius: ${doc.button_corner_radius || '4px'};
            --field-radius: ${doc.field_corner_radius || '4px'};
            --dialog-radius: ${doc.dialog_corner_radius || '8px'};
            --checkbox-radius: ${doc.checkbox_radius || '2px'};

            --modal-header-bg: ${doc.modal_header_color || '#ffffff'};
            --modal-footer-bg: ${doc.modal_footer_color || '#f7fafc'};
            --modal-bg: ${doc.modal_background || '#ffffff'};

            --tab-bg: ${doc.tab_background || '#f7fafc'};
            --tab-active-bg: ${doc.tab_active_background || '#ffffff'};
            --tab-text: ${doc.tab_text_color || '#8d99a6'};
            --tab-active-text: ${doc.tab_active_text_color || '#000000'};

            --toast-bg: ${doc.toast_background || '#2c333a'};
            --toast-text: ${doc.toast_text_color || '#ffffff'};

            --dropdown-bg: ${doc.dropdown_background || '#ffffff'};
            --dropdown-hover: ${doc.dropdown_item_hover || '#f7fafc'};
        }

        /* Buttons */
        .btn {
            border-radius: var(--btn-radius) !important;
        }
        .btn-primary {
            background-color: var(--primary-color) !important;
            border-color: var(--primary-color) !important;
            color: #fff !important;
        }
        .btn-secondary {
            background-color: var(--secondary-color) !important;
            border-color: var(--secondary-color) !important;
            color: #fff !important;
        }
        .btn-danger {
            background-color: var(--danger-color) !important;
            border-color: var(--danger-color) !important;
            color: #fff !important;
        }
        .btn-light {
            background-color: var(--light-color) !important;
            border-color: var(--light-color) !important;
            color: #000 !important;
        }

        /* Layout */
        .sidebar, .app-sidebar, .layout-side-section, #sidebar-menu {
            background-color: var(--sidebar-bg) !important;
        }

        .navbar, .navbar-default, #navbar-breadcrumbs {
            background-color: var(--topbar-bg) !important;
        }

        .frappe-card, .widget, .module-card, .card {
            background-color: var(--card-bg) !important;
            border-radius: var(--card-radius);
            box-shadow: var(--card-shadow);
        }

        .grid, .frappe-list, .datatable, .data-row {
            background-color: var(--table-bg) !important;
        }

        body, .page-container {
            background-color: var(--page-bg) !important;
            font-family: var(--font-family), sans-serif !important;
        }

        /* Typography & Forms */
        label, .control-label, .grid-heading {
            color: var(--label-color) !important;
        }

        .form-section, .section-head {
            background-color: var(--section-bg) !important;
        }

        .form-control, .grid-row, .frappe-control, .input-with-feedback {
            border-color: var(--form-border) !important;
            border-radius: var(--field-radius) !important;
        }

        input[type="checkbox"], .checkbox-input {
            border-radius: var(--checkbox-radius) !important;
        }

        .sidebar .standard-sidebar-section:hover {
            background-color: var(--hover-color) !important;
        }

        .page-head {
            background-color: var(--page-head-bg) !important;
        }

        .grid-heading-row, .grid-heading {
            background-color: var(--table-head-bg) !important;
            color: var(--label-color) !important;
            border-bottom: 1px solid var(--form-border) !important;
        }

        .grid-body .grid-row:nth-child(even), .rows .grid-row:nth-child(even) {
            background-color: var(--alt-row-bg) !important;
        }

        /* Modals / Dialogs */
        .modal-content, .modal-dialog {
            background-color: var(--modal-bg) !important;
            border-radius: var(--dialog-radius) !important;
        }
        .modal-header {
            background-color: var(--modal-header-bg) !important;
        }
        .modal-footer {
            background-color: var(--modal-footer-bg) !important;
        }

        /* Tabs */
        .nav-tabs .nav-link, .tab-link {
            background-color: var(--tab-bg) !important;
            color: var(--tab-text) !important;
        }
        .nav-tabs .nav-link.active, .tab-link.active {
            background-color: var(--tab-active-bg) !important;
            color: var(--tab-active-text) !important;
        }

        /* Toasts / Alerts */
        .toast, .alert-message {
            background-color: var(--toast-bg) !important;
            color: var(--toast-text) !important;
        }

        /* Dropdowns */
        .dropdown-menu {
            background-color: var(--dropdown-bg) !important;
        }
        .dropdown-item:hover, .dropdown-menu li > a:hover {
            background-color: var(--dropdown-hover) !important;
        }
    `;
    document.head.appendChild(style);
}

function remove_theme() {
    const old_style = document.getElementById('custom-theme-style');
    if (old_style) old_style.remove();
}
