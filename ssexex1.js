import axios from "axios"; // axios 라이브러리를 불러옵니다. 이 라이브러리는 HTTP 요청을 쉽게 할 수 있도록 도와줍니다.
import { useEffect, useState } from "react"; // React의 useEffect와 useState 훅을 불러옵니다. 이 훅은 상태 관리와 사이드 이펙트를 처리할 때 사용됩니다.
import { Link, useParams } from "react-router-dom"; // React Router의 Link와 useParams를 불러옵니다. Link는 페이지 간의 이동을 도와주고, useParams는 URL 파라미터를 가져옵니다.

// 메인에서 접근
// user/main/sub/작품번호
export default function Sub() { // Sub 컴포넌트 정의
  const { no } = useParams(); // URL의 '작품번호' 파라미터를 가져와서 변수 no에 저장합니다.

  const userNo = 3; // 사용자 번호를 하드코딩하여 변수 userNo에 저장합니다. (로그인된 사용자 번호로 가정)

  const [show, setShow] = useState({}); // 작품에 대한 전체 정보를 저장하는 상태 변수를 초기화합니다.
  const [characters, setCharacters] = useState([]); // 작품에 포함된 캐릭터 리스트를 저장하는 상태 변수를 초기화합니다.
  const [styles, setStyles] = useState([]); // 캐릭터의 스타일 정보를 저장하는 상태 변수를 초기화합니다.
  const [items, setItems] = useState([]); // 각 스타일에 연결된 아이템 정보를 저장하는 상태 변수를 초기화합니다.

  const [selectCharacter, setSelectCharacter] = useState(null); // 현재 선택된 캐릭터 정보를 저장하는 상태 변수를 초기화합니다.

  const [scrap, setScrap] = useState(); // 스크랩(찜하기) 여부를 저장하는 상태 변수를 초기화합니다.

  const showSubData = () => { // 작품 번호에 따라 작품의 모든 정보를 가져오는 함수 정의
    axios
      .get(`/main/sub/${no}`) // 서버로부터 작품 번호(no)에 해당하는 데이터를 GET 요청으로 가져옵니다.
      .then((res) => { // 요청이 성공했을 때 실행되는 코드 블록
        setShow(res.data.show || {}); // 작품 정보를 상태 변수 show에 저장합니다. 만약 데이터가 없으면 빈 객체를 저장합니다.
        setCharacters(res.data.characters || []); // 캐릭터 리스트를 상태 변수 characters에 저장합니다. 만약 데이터가 없으면 빈 배열을 저장합니다.
        setStyles(res.data.styles || []); // 스타일 리스트를 상태 변수 styles에 저장합니다. 만약 데이터가 없으면 빈 배열을 저장합니다.
        setItems(res.data.items || []); // 아이템 리스트를 상태 변수 items에 저장합니다. 만약 데이터가 없으면 빈 배열을 저장합니다.

        if (res.data.characters && res.data.characters.length > 0) { // 캐릭터 데이터가 존재하고, 그 길이가 0보다 크다면
          setSelectCharacter(res.data.characters[0]); // 첫 번째 캐릭터를 선택된 캐릭터로 설정합니다.
        }
      })
      .catch((error) => { // 요청이 실패했을 때 실행되는 코드 블록
        console.log(error); // 에러 내용을 콘솔에 출력합니다.
      });
  };

  const isScrap = (characterNo) => { // 특정 캐릭터가 스크랩되어 있는지 확인하는 함수 정의
    axios
      .get(`/main/like/${characterNo}/${userNo}`) // 서버로 해당 캐릭터가 사용자가 스크랩했는지 여부를 GET 요청으로 확인합니다.
      .then((s) => { // 요청이 성공했을 때 실행되는 코드 블록
        setScrap(s.data === true); // 응답 데이터가 true면 scrap 상태를 true로 설정합니다.
      })
      .catch((error) => { // 요청이 실패했을 때 실행되는 코드 블록
        console.log(error); // 에러 내용을 콘솔에 출력합니다.
      });
  };

  const changeCharacter = (d) => { // 선택된 캐릭터를 바꾸는 함수 정의
    if (selectCharacter) { // 선택된 캐릭터가 있을 경우에만 실행
      const index = characters.findIndex((c) => c.no === selectCharacter.no); // 현재 선택된 캐릭터의 배열 인덱스를 찾습니다.

      const nextIndex =
        index + d < 0
          ? characters.length - 1
          : index + d >= characters.length
          ? 0
          : index + d; // 인덱스가 배열의 범위를 벗어나지 않도록 조정하여 다음 캐릭터의 인덱스를 결정합니다.

      const newCharacter = characters[nextIndex]; // 다음 캐릭터를 newCharacter 변수에 저장합니다.

      setSelectCharacter(newCharacter); // 선택된 캐릭터를 newCharacter로 변경합니다.
      isScrap(newCharacter.no); // 새로 선택된 캐릭터의 스크랩 여부를 확인합니다.
    }
  };

  const scrapProc = () => { // 스크랩(찜하기) 버튼 클릭 시 호출되는 함수 정의
    if (scrap) { // 이미 스크랩되어 있다면
      axios
        .delete(`/main/scrap/${selectCharacter.no}/${userNo}`) // 스크랩을 삭제하기 위해 DELETE 요청을 보냅니다.
        .then((res) => {
          if (res.data.result === true) { // 삭제가 성공하면
            setScrap(false); // scrap 상태를 false로 설정합니다.
          }
        })
        .catch((error) => {
          console.log("스크랩 삭제 실패 :", error); // 삭제 실패 시 에러 메시지를 출력합니다.
        });
    } else { // 스크랩되지 않은 상태라면
      axios
        .post("/main/scrap", {
          characterNo: selectCharacter.no,
          userNo: userNo,
        }) // 스크랩을 추가하기 위해 POST 요청을 보냅니다.
        .then((res) => {
          if (res.data.result === true) { // 추가가 성공하면
            setScrap(true); // scrap 상태를 true로 설정합니다.
          }
        })
        .catch((error) => {
          console.log("스크랩 실패 :", error); // 추가 실패 시 에러 메시지를 출력합니다.
        });
    }
  };

  useEffect(() => { // characters 배열이 변경될 때마다 실행되는 useEffect 훅
    if (characters.length > 0) { // characters 배열에 요소가 있다면
      setSelectCharacter(characters[0]); // 첫 번째 캐릭터를 선택된 캐릭터로 설정합니다.
    }
  }, [characters]);

  useEffect(() => { // selectCharacter가 변경될 때마다 실행되는 useEffect 훅
    if (selectCharacter) { // 선택된 캐릭터가 존재하면
      isScrap(selectCharacter.no); // 그 캐릭터의 스크랩 여부를 확인합니다.
    }
  }, [selectCharacter]);

  useEffect(() => { // 컴포넌트가 처음 렌더링되거나 no가 변경될 때 실행되는 useEffect 훅
    showSubData(); // 작품의 모든 정보를 가져오는 함수 호출
    isScrap(); // 스크랩 여부 확인
  }, [no]);

  return (
    <div>
      <h1>{show.title}</h1> {/* 작품 제목을 표시 */}

      <div>
        <button onClick={() => changeCharacter(-1)}>Previous Character</button> {/* 이전 캐릭터로 이동하는 버튼 */}
        <button onClick={() => changeCharacter(1)}>Next Character</button> {/* 다음 캐릭터로 이동하는 버튼 */}
      </div>

      {selectCharacter && ( // 선택된 캐릭터가 존재할 때만 렌더링
        <div>
          <h2>{selectCharacter.name}</h2> {/* 선택된 캐릭터의 이름 표시 */}
          <img src={selectCharacter.pic} alt={selectCharacter.name} /> {/* 선택된 캐릭터의 이미지 표시 */}
          <button onClick={() => scrapProc()}>
            {scrap ? "스크랩했음" : "스크랩안했음"} {/* 스크랩 상태에 따라 버튼 텍스트 변경 */}
          </button>

          <div>
            {styles
              .filter((s) => s.characterNo === selectCharacter.no) // 선택된 캐릭터에 해당하는 스타일만 필터링
              .map((s) => (
                <div key={s.no}>
                  <h3>Style {s.no}</h3> {/* 스타일 번호를 표시 */}
                  <img src={s.pic} alt={`Style ${s.no}`} /> {/* 스타일 이미지 표시 */}
                  {items
                    .filter((i) => s.no === i.styleNo) // 스타일에 해당하는 아이템만 필터링
                    .map((i) => (
                      <Link to={`/user/productDetail/${i.no}`} key={i.no}>
                        <div>
                          <img src={i.pic} alt={`Item ${i.no}`} /> {/* 아이템 이미지 표시 */}
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
