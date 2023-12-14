const SingleSelect = (props: any) => {
  const {
    selectedValue,
    options,
    onChange,
    placeholder,
    menuRef,
    searchValue,
    setSearchValue,
    isOpen,
    setIsOpen,
  } = props;
  const filteredItems = [...options].sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  const displayOption = isOpen ? "block" : "none";

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    onChange(option);
    toggleSelect();
    setSearchValue("");
  };

  const items = filteredItems.filter((item) => {
    return `${item.name}`.toLowerCase().includes(searchValue?.toLowerCase());
  });

  return (
    <div className="relative h-full" ref={menuRef}>
      <button
        className="w-full h-full text-sm leading-6 border border-[#cbd5e1] bg-white text-[#475569] flex items-center justify-between px-[12px] py-[8px] cursor-pointer rounded-lg gap-[15px] font-[500]"
        onClick={toggleSelect}
      >
        <div className="flex items-center gap-2">
          {!selectedValue?.name ? (
            placeholder
          ) : (
            <>
              {/* <span
                className="h-[11px] w-[11px] rounded-full block"
                style={{ backgroundColor: selectedValue?.colorCode }}
              /> */}
              {selectedValue?.name}
            </>
          )}
        </div>
        <img
          className="opacity-60"
          src="/assets/icons/down-arrow.svg"
          alt="arrow icon"
        />
      </button>

      <ul
        className="bg-white text-[#475569] w-full z-[1] absolute rounded-lg text-sm shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)] mt-[5px]"
        style={{ display: displayOption }}
      >
        {/* <div className="px-[20px] py-[10px] border-b border-b-[#e2e8f0]">
          <input
            className="flex w-full px-[12px] py-[8px] bg-white border border-[#93c5fd] rounded text-sm text-[#475569] focus:outline-[2px] outline-transparent outline-offset-2"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
          />
        </div> */}
        <div className="w-full overflow-auto">
          {/* <div className={styles.ss__option__list}> */}
          {items?.length > 0 ? (
            items?.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer px-[16px] py-[10px] flex items-center gap-1 hover:bg-[#156ff70d] text-black"
                onClick={() => handleOptionClick(item)}
              >
                {/* <span
                  className={styles.ss__button__label__icon}
                  style={{ backgroundColor: item?.colorCode }}
                /> */}
                {item.name}
              </div>
            ))
          ) : (
            <span className="text-[#0f172a] text-sm p-[10px] block text-center">
              No Topics Found
            </span>
          )}
          {/* </div> */}
        </div>
      </ul>
    </div>
  );
};

export default SingleSelect;
