// component/atom/BottomBlurOverlay.jsx
function BottomBlurOverlay() {
  return (
    <div
      className="
        fixed bottom-0 left-0 w-full pointer-events-none bg-warna1/24 z-999
        h-18 md:h-24 backdrop-blur-md
        [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_10%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0))]
      "
    />
  );
}

export default BottomBlurOverlay;
