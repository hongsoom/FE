import React from "react";
import "../../css/regionModal.scss";

const RegionModal = (props) => {
  const {
    region,
    selectedRegion,
    setRegion,
    showRegionModal,
    closeRegionModal,
    editdata,
    is_edit,
  } = props;

  const isChecked = (e) => {
    if (e.target.checked) {
      setRegion(e.target.value);
    }
  };

  console.log(selectedRegion);

  return (
    <div className={showRegionModal ? "openModal regionWrap" : "regionWrap"}>
      {showRegionModal ? (
        <div className="background" onClick={closeRegionModal}>
          <div className="region_wrap" onClick={(e) => e.stopPropagation()}>
            <section>
              <div className="modalTitle">지역을 선택해주세요</div>
              <div className="regionsWrap">
                {region.map((v, i) => {
                  return (
                    <div key={i}>
                      {is_edit ? (
                        <div
                          className="_regions"
                          key={i}
                          style={
                            selectedRegion === v
                              ? {
                                  background: "#8ACEFF",
                                  color: "#fff",
                                  boxShadow:
                                    "inset 0px 4px 4px rgba(0, 0, 0, 0.12)",
                                }
                              : {
                                  background: "#F5F9FF",
                                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                }
                          }
                        >
                          <input
                            type="radio"
                            name="region"
                            value={v}
                            id={v}
                            onChange={isChecked}
                          />
                          <label htmlFor={v}>{v}</label>
                        </div>
                      ) : (
                        <div
                          className="_regions"
                          key={i}
                          style={
                            selectedRegion === v
                              ? {
                                  background: "#8ACEFF",
                                  color: "#fff",
                                  boxShadow:
                                    "inset 0px 4px 4px rgba(0, 0, 0, 0.12)",
                                }
                              : {
                                  background: "#F5F9FF",
                                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                }
                          }
                        >
                          <input
                            type="radio"
                            name="region"
                            value={v}
                            id={v}
                            onChange={isChecked}
                          />
                          <label htmlFor={v}>{v}</label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="doneButton">
                <button className="close" onClick={closeRegionModal}>
                  선택완료
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RegionModal;
