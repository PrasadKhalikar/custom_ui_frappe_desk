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
            /* Basic Colors */
            --primary-color: ${doc.primary_button_color || '#2490ef'};
            --secondary-color: ${doc.secondary_button_color || '#74808b'};
            --danger-color: ${doc.danger_button_color || '#e24c4c'};
            --light-color: ${doc.light_button_color || '#f4f5f6'};

            /* Backgrounds */
            --sidebar-bg: ${doc.sidebar_background || '#ffffff'};
            --topbar-bg: ${doc.topbar_background || '#ffffff'};
            --card-bg: ${doc.card_background || '#ffffff'};
            --table-bg: ${doc.table_background || '#ffffff'};
            --page-bg: ${doc.background_color || '#f0f4f7'};

            /* Fonts & Typography */
            --font-family: ${doc.font_family || 'Inter, sans-serif'};
            --label-color: ${doc.label_color || '#8d99a6'};
            --section-bg: ${doc.section_bg_color || '#ffffff'};
            --form-border: ${doc.form_border_color || '#d1d8dd'};
            --hover-color: ${doc.hover_color || '#f7f7f7'};

            /* General Styles */
            --card-radius: ${doc.card_border_radius || '8px'};
            --card-shadow: ${doc.card_shadow_style || '0 1px 3px rgba(0,0,0,0.1)'};

            --page-head-bg: ${doc.page_head_background || '#ffffff'};
            --table-head-bg: ${doc.table_head_background || '#f7fafc'};
            --alt-row-bg: ${doc.alt_row_background || '#ffffff'};

            /* UI Components & Customization */
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

            /* v16 / Additional Components */
            --badge-radius: ${doc.badge_radius || '12px'};
            --badge-bg: ${doc.badge_bg_color || '#eef2f5'};
            --badge-text: ${doc.badge_text_color || '#6c757d'};

            --avatar-radius: ${doc.avatar_radius || '50%'};

            --progress-radius: ${doc.progress_radius || '8px'};
            --progress-bg: ${doc.progress_bg_color || '#e9ecef'};

            --sidebar-active-bg: ${doc.sidebar_active_item_bg || '#f0f4f7'};
            --sidebar-active-text: ${doc.sidebar_active_item_text || '#1f272e'};

            --breadcrumb-color: ${doc.breadcrumb_color || '#6c757d'};

            --switch-checked-bg: ${doc.switch_checked_bg || '#2490ef'};
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

        .frappe-card, .widget, .module-card, .card, .dashboard-card, .page-card, .section-card, .list-row-container {
            background-color: var(--card-bg) !important;
            border-radius: var(--card-radius) !important;
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

        /* Sidebar Interaction */
        .sidebar .standard-sidebar-section:hover,
        .desk-sidebar .sidebar-item a:hover {
            background-color: var(--hover-color) !important;
        }

        .sidebar-item.selected a, .standard-sidebar-section.selected {
             background-color: var(--sidebar-active-bg) !important;
             color: var(--sidebar-active-text) !important;
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

        /* Badges / Tags */
        .badge, .tag, .indicator-pill {
            border-radius: var(--badge-radius) !important;
        }
        /* Only apply custom bg if not semantic like danger/success, or if user wants full override?
           Safest is to apply to generic or specific non-semantic pills if any.
           For now, let's just do radius, as colors usually mean status.
           But let's allow a "default" override if they set it. */

        /* Avatars */
        .avatar, .avatar-frame {
            border-radius: var(--avatar-radius) !important;
        }

        /* Progress Bars */
        .progress, .progress-bar {
            border-radius: var(--progress-radius) !important;
        }
        .progress {
            background-color: var(--progress-bg) !important;
        }

        /* Breadcrumbs */
        .breadcrumb, .breadcrumb-item, .breadcrumb a {
            color: var(--breadcrumb-color) !important;
        }

        /* Switches / Toggles */
        .switch.checked .switch-slider,
        input:checked + .toggle-switch,
        .input-switch input:checked + .slider {
            background-color: var(--switch-checked-bg) !important;
        }

        /* Tailwind-ish Utilities Support (if v16 uses them) */
        .rounded, .rounded-lg, .rounded-md, .rounded-sm {
            border-radius: var(--card-radius) !important;
        }
    `;
    document.head.appendChild(style);
}

function remove_theme() {
    const old_style = document.getElementById('custom-theme-style');
    if (old_style) old_style.remove();
}
