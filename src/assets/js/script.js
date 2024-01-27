"use strict";

// Execute when document DOM is loaded to make sure site contents are rendered
window.onload = () => {
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  let scrollbarWidth = getScrollbarWidth();
  let currentTarget = null;
  let currentToggle = null;
  let isCollapsing = false;

  const handleToggle = (event) => {
    let toggleElement = event.currentTarget;
    currentToggle = toggleElement.dataset.toggle;

    // Set currentTarget
    toggleElement.hasAttribute("data-target")
      ? (currentTarget = toggleElement.dataset.target)
      : (currentTarget = null);

    switch (currentToggle) {
      case "collapse":
        toggleCollapse();
        break;
      case "modal":
        toggleModal();
        break;
      case "sidebar":
        toggleSidebar();
        break;
      default:
        break;
    }
  };

  // Lisen button toggles clicks
  let buttonToggle = document.querySelectorAll("[data-toggle]");
  for (let i = 0; i < buttonToggle.length; i++) {
    buttonToggle[i].addEventListener("click", handleToggle);
  }

  // --- UTILITIES ---
  const toggleAriaExpanded = (targetElement) => {
    let toggleElements = document.querySelectorAll(`[data-target="${targetElement}"]`);
    for (let i = 0; i < toggleElements.length; i++) {
      if (toggleElements[i].hasAttribute("aria-expanded")) {
        toggleElements[i].getAttribute("aria-expanded") == "true"
          ? toggleElements[i].setAttribute("aria-expanded", "false")
          : toggleElements[i].setAttribute("aria-expanded", "true");
      }
    }
  };

  const enableTab = (targetElement, changeTabIndex = true) => {
    if (changeTabIndex) targetElement.setAttribute("tabindex", 0);
    targetElement.classList.remove("collapse");
  };

  const disableTab = (targetElement, changeTabIndex = true) => {
    if (changeTabIndex) targetElement.setAttribute("tabindex", -1);
    setTimeout(() => {
      targetElement.classList.add("collapse");
    }, 50);
  };

  // --- BACKDROP ---
  const setBackdrop = () => {
    let backdrop = document.createElement("div");
    backdrop.setAttribute(
      "class",
      "fixed w-screen h-screen bg-neutral-900 opacity-50 z-20 transition top-0 left-0"
    );
    backdrop.setAttribute("data-target", currentTarget);
    backdrop.setAttribute("data-toggle", currentToggle);
    backdrop.setAttribute("data-backdrop", currentTarget);
    backdrop.addEventListener("click", handleToggle);
    return backdrop;
  };

  const clearBackdrop = () => {
    let backdrop = document.querySelector(`[data-backdrop="${currentTarget}"]`);
    if (backdrop != null) backdrop.remove();
  };

  const enableBodyScroll = () => {
    let body = document.getElementsByTagName("BODY")[0];
    body.classList.remove("overflow-y-hidden");
    body.style.paddingRight = 0;
    scrollbarWidth = getScrollbarWidth();
  };

  const disableBodyScroll = () => {
    let body = document.getElementsByTagName("BODY")[0];
    body.classList.add("overflow-y-hidden");
    body.style.paddingRight = scrollbarWidth + "px";
  };

  let focusTrapElements = [];

  const enableFocusTrap = (targetElement) => {
    focusTrapElements.push(targetElement);
    setFocusOnFocusTrapElement();
    focusTrapElements[focusTrapElements.length - 1].addEventListener("keydown", handleFocusTrap);
  };

  const disableFocusTrap = () => {
    disableTab(focusTrapElements[focusTrapElements.length - 1]);
    focusTrapElements[focusTrapElements.length - 1].removeEventListener("keydown", handleFocusTrap);
    focusTrapElements.pop();

    if (focusTrapElements.length != 0) setFocusOnFocusTrapElement();
  };

  const setFocusOnFocusTrapElement = () => {
    enableTab(focusTrapElements[focusTrapElements.length - 1]);
    focusTrapElements[focusTrapElements.length - 1].focus();
    setTimeout(() => {
      focusTrapElements[focusTrapElements.length - 1].removeAttribute("tabindex");
      focusTrapElements[focusTrapElements.length - 1].blur();
    }, 50);
  };

  const handleFocusTrap = (event) => {
    let focusableElements = focusTrapElements[focusTrapElements.length - 1].querySelectorAll(
      `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]`
    );

    // Filter element where parent have [tabindex="-1"].
    let filterFocusableElements = [];
    for (let i = 0; i < focusableElements.length; i++) {
      if (!focusableElements[i].closest(`[tabindex="-1"]`)) {
        filterFocusableElements.push(focusableElements[i]);
      }
    }

    let firstElement = filterFocusableElements[0];
    let lastElement = filterFocusableElements[filterFocusableElements.length - 1];

    if (event.type === "keydown" && event.keyCode === 9) {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // --- 01. COLLAPSE ---
  const toggleCollapse = () => {
    const showCollapse = (targetElement) => {
      targetElement.classList.remove("h-0");

      let contentHeight = targetElement.clientHeight + "px";

      targetElement.style.height = "0";
      setTimeout(() => (targetElement.style.height = contentHeight), 50);
      setTimeout(() => targetElement.removeAttribute("style"), 500);
      setTimeout(() => targetElement.classList.remove("is-collapsing"), 301);
      enableTab(targetElement, false);
    };

    const hideCollapse = (targetElement) => {
      let contentHeight = targetElement.clientHeight + "px";

      targetElement.style.height = contentHeight;
      setTimeout(() => (targetElement.style.height = "0"), 50);
      setTimeout(() => targetElement.removeAttribute("style"), 500);
      setTimeout(() => targetElement.classList.remove("is-collapsing"), 301);

      targetElement.classList.add("h-0");
      disableTab(targetElement, false);
    };

    const toggleIcon = (targetElement) => {
      let icon = document.querySelector(`[data-target="${targetElement}"] .collapse-icon`);

      if (icon != null) {
        icon.classList.contains("rotate-180")
          ? icon.classList.remove("rotate-180")
          : icon.classList.add("rotate-180");
      }
    };

    const toggleAccordion = (accordionId) => {
      let accordions = document.querySelectorAll(`[data-accordion="${accordionId}"]`);

      if (accordions != null) {
        for (let i = 0; i < accordions.length; i++) {
          if (accordions[i].getAttribute("id") != currentTarget && !accordions[i].classList.contains("h-0")) {
            hideCollapse(accordions[i]);
            toggleIcon(accordions[i].getAttribute("id"));
            toggleAriaExpanded(accordions[i].getAttribute("id"));
          }
        }
      }
    };

    if (currentTarget == null) return null;

    let targetElement = document.getElementById(currentTarget);

    if (targetElement.classList.contains("is-collapsing")) return null;
    targetElement.classList.add("is-collapsing");

    targetElement.classList.contains("h-0") ? showCollapse(targetElement) : hideCollapse(targetElement);

    toggleIcon(currentTarget);
    toggleAriaExpanded(currentTarget);

    if (targetElement.hasAttribute("data-accordion")) {
      let accordionId = targetElement.dataset.accordion;
      toggleAccordion(accordionId);
    }
  };

  // --- 02. MODAL ---
  const toggleModal = () => {
    if (currentTarget == null) return null;

    let targetElement = document.getElementById(currentTarget);

    targetElement != null && targetElement.classList.contains("hidden")
      ? showModal(targetElement)
      : hideModal(targetElement);
  };

  const showModal = (targetElement) => {
    targetElement.classList.remove("hidden");
    targetElement.classList.add("flex");
    targetElement.style.opacity = 1;

    let targetModal = document.querySelector(`[data-modal="${currentTarget}"]`);

    if (targetModal != null)
      setTimeout(() => {
        targetModal.classList.remove("scale-0");
      }, 10);

    targetElement.insertBefore(setBackdrop(), targetElement.firstChild);

    disableBodyScroll();
    enableFocusTrap(targetElement);
  };

  const hideModal = (targetElement) => {
    targetElement.classList.add("hidden");
    targetElement.classList.remove("flex");
    targetElement.style.opacity = 0;

    let targetModal = document.querySelector(`[data-modal="${currentTarget}"]`);

    if (targetModal != null) targetModal.classList.add("scale-0");

    clearBackdrop();
    enableBodyScroll();
    disableFocusTrap();
  };

  // --- 03. SIDEBAR/OFFCANVAS ---
  const toggleSidebar = () => {
    if (currentTarget == null) return null;
    let targetElement = document.getElementById(currentTarget);

    if (targetElement != null && targetElement.classList.contains("-translate-x-full"))
      sidebarPosition = "-translate-x-full";
    if (targetElement != null && targetElement.classList.contains("translate-x-full"))
      sidebarPosition = "translate-x-full";

    targetElement != null && targetElement.classList.contains(sidebarPosition)
      ? showSidebar(targetElement)
      : hideSidebar(targetElement);
  };

  let sidebarPosition = null;

  const showSidebar = (targetElement) => {
    targetElement.classList.remove(sidebarPosition, "shadow-2xl");
    targetElement.parentNode.insertBefore(setBackdrop(), targetElement);
    disableBodyScroll();
    enableFocusTrap(targetElement);
  };

  const hideSidebar = (targetElement) => {
    targetElement.classList.add(sidebarPosition, "shadow-2xl");
    clearBackdrop();
    enableBodyScroll();
    disableFocusTrap();
  };
};
