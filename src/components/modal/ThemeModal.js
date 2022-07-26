import React from "react";
import "../../css/themeModal.scss";

const ThemeModal = (props) => {
  const {
    theme,
    selectedTheme,
    setTheme,
    showThemeModal,
    closeThemeModal,
    editdata,
    is_edit,
  } = props;

  console.log(selectedTheme);
  return (
    <div className={showThemeModal ? "openModal themeWrap" : "themeWrap"}>
      {showThemeModal ? (
        <div className="background" onClick={closeThemeModal}>
          <div className="theme_wrap" onClick={(e) => e.stopPropagation()}>
            <section>
              <div className="modalTitle">테마를 선택해주세요</div>
              <div className="themesWrap">
                {theme.map((v, i) => {
                  return (
                    <div
                      className="_themes"
                      key={i}
                      style={
                        selectedTheme.includes(v)
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
                        type="checkbox"
                        name="theme"
                        value={v}
                        id={v}
                        checked={selectedTheme.includes(v) ? true : false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTheme((pre) => {
                              const newData = [...pre];
                              newData.push(v);
                              return newData;
                            });
                          } else {
                            setTheme((pre) => {
                              const newData = pre.filter((l, i) => {
                                return l !== v;
                              });
                              return newData;
                            });
                          }
                        }}
                      />
                      <label htmlFor={v}>{v}</label>
                    </div>
                  );
                })}
              </div>
              <div className="doneButton">
                <button className="close" onClick={closeThemeModal}>
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

export default ThemeModal;
