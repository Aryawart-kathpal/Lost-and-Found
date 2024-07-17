import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";

const PaginationContainer = () => {
    const {pagination} = useLoaderData();
    const {page,pageSize,pageCount,total} = pagination;
    console.log(pagination);

    const {search,pathname} = useLocation();
    const [activePage,setActivePage] = useState(page);

    const changePage = (page) =>{
        const searchParams = new URLSearchParams(search);
        searchParams.set('page',page);  
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    const  buttonComponent = (text)=>{
        return <button className={`btn join-item ${activePage===text? 'btn-active':''}`} onClick={()=>changePage(parseInt(text))}>{text}</button>
    }
    const navigate = useNavigate();

    const PageNext = ()=>{
        const searchParams = new URLSearchParams(search);
        let page=activePage;
        if(page===pageCount) page=1;
        else page = (activePage+1)%(pageCount+1);
        setActivePage(page);
        searchParams.set('page',page);  
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    const PagePrev = ()=>{
        const searchParams = new URLSearchParams(search);
        let page=activePage;
        if(page===1) page=pageCount;
        else page = (page-1+pageCount)%(pageCount);
        searchParams.set('page',page);  

        setActivePage(page);
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    if(pageCount===1) return null;

  return (
    <div className="join w-full justify-end mt-4 align-element">
        <button className="btn join-item" onClick={PagePrev}>PREV</button>
        {buttonComponent(1)}
        {activePage > 2 && buttonComponent('...')}
        {activePage!==1 && activePage!==pageCount && buttonComponent(activePage)}
        {activePage < pageCount-1 && buttonComponent('...')}
        {buttonComponent(pageCount)}
        <button className="btn join-item" onClick={PageNext}>NEXT</button>
    </div>
  )
}
export default PaginationContainer