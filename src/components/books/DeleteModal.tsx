const DeleteModal = () => {
  return (
    <div style={modalStyle}>
      <div style={modalContent}>
        <p>あいうえお</p>
        <button>yes</button>
        <button>no</button>
      </div>
      <div>
        <button>閉じる</button>
      </div>
    </div>
  );
};

const modalContent: React.CSSProperties = {
    background: "white",
    width: "600px",
    height: "750px",
    padding: "50px",
    borderRadius: "3px",
    
  };
  
  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex:100
  };

export default DeleteModal;
