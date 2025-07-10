export const showModal = (image: any) => {
    const container = document.createElement("div");
    container.classList.add("image-modal");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    container.style.backdropFilter = "blur(1rem)";
    container.style.zIndex = "10000";

    document.body.classList.add("image-modal-open");

    container.innerHTML = `
          <div class="image-modal-content">
              <img src="${image}" alt="image" />
          </div>
      `;

    container.addEventListener("click", (event: MouseEvent) => {
        if (event.target === container) {
            container.remove();
            document.body.classList.remove("image-modal-open");
        }
    });

    document.body.appendChild(container);
};
export default showModal;