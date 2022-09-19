import './MainTop.scss';

const MainTop = () => {
  return <div className="maintop">
    <p className='mainTitle'>여보</p>
    <p className='subTitle'>나와 너의 취향을 담은 여행 보따리<br/>
    내 소중한 추억을 더 가치있게</p>
    <div className='searchBar'>
      <svg className='searchIcon searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="rgba(69,69,69,1)"/></svg>
      <input className='searchText searchItem' value="광주 트렌드" />
      <svg className='searchDelete searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(69,69,69,1)"/></svg>
    </div>
    <p className='popularSearchTermsTitle'>인기 검색어</p>
    <div className='popularSearchTerms'>
      <div className='rankIndex'>
        <p>1위</p>
        <p>2위</p>
        <p>3위</p>
        <p>4위</p>
        <p>5위</p>
      </div>
      <div className='rankText'>
        <p>부산 감천마을</p>
        <p>부산 감천마을</p>
        <p>부산 감천마을</p>
        <p>부산 감천마을</p>
        <p>부산 감천마을</p>
      </div>
      
    </div>
  </div>
}
export default MainTop;