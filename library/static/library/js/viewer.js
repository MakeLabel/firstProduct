// 아래는 버튼을 클릭했을 때 Modal을 띄워주도록 하는 코드들입니다.

const thumbnailModal = document.getElementById('thumbnail-modal')
const openModal = () => {
    thumbnailModal.style.display = "flex"
}

const closeModal = () => {
    thumbnailModal.style.display = "none"
}