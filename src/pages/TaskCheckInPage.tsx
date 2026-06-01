import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Gift,
  Mic,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";
import { useHanziStore } from "../stores/hanziStore";

const hanziSceneIcons = ["📦", "😴", "🌟", "☔", "🏙️"];
const CHECKIN_REWARD_POINTS = 10;

export function TaskCheckInPage() {
  const { taskId } = useParams();
  const tasks = useHanziStore((state) => state.tasks);
  const startTask = useHanziStore((state) => state.startTask);
  const submitTask = useHanziStore((state) => state.submitTask);
  const getTaskItems = useHanziStore((state) => state.getTaskItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordingError, setRecordingError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [strokeReplayKey, setStrokeReplayKey] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  const task = tasks.find((item) => item.id === taskId);
  const taskItems = task ? getTaskItems(task.id) : [];
  const currentItem = taskItems[currentIndex] ?? taskItems[0];
  const sceneIcon = hanziSceneIcons[currentIndex % hanziSceneIcons.length];
  const completed = task?.status === "completed";
  const isLastPage = currentIndex === taskItems.length - 1;

  useEffect(() => {
    if (task && task.status === "not_started") {
      startTask(task.id);
    }
  }, [startTask, task]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [taskId]);

  useEffect(
    () => () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    },
    [audioUrl],
  );

  if (!task) {
    return (
      <div className="full-task-page">
        <main className="empty-state">没有找到这个任务。</main>
      </div>
    );
  }

  async function startRecording() {
    setRecordingError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordingError("无法使用麦克风，可以先用拍照或阅读确认完成打卡。");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setIsRecording(false);
  }

  function goToPrevious() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => Math.min(taskItems.length - 1, index + 1));
  }

  function replayStrokeAnimation() {
    setStrokeReplayKey((key) => key + 1);
  }

  function playRecording() {
    if (!audioPlaybackRef.current) return;

    setIsPlayingBack(true);
    audioPlaybackRef.current.currentTime = 0;
    void audioPlaybackRef.current.play();
    window.setTimeout(() => setIsPlayingBack(false), 900);
  }

  function submitCheckIn() {
    if (!task) return;

    if (!completed) {
      submitTask(
        task.id,
        {
          taskId: task.id,
          type: "reading",
          readingMinutes: taskItems.length,
          childNote: "完成生字打卡",
        },
        CHECKIN_REWARD_POINTS,
      );
    }

    setShowReward(true);
  }

  return (
    <div className="checkin-page">
      <header className="checkin-header">
        <Link to="/tasks" className="icon-link" aria-label="返回任务列表">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <p className="eyebrow">生字</p>
        </div>
      </header>

      <main className="checkin-layout">
        <section className="checkin-study-area">
          {currentItem ? (
            <>
              <article className="hanzi-scene-card">
                <div className="hanzi-scene-illustration" aria-hidden="true">
                  {sceneIcon}
                </div>
                <h2>{currentItem.words[0]}小任务</h2>
                <p>{currentItem.exampleSentence}</p>
                <div className="scene-audio-actions">
                  <button
                    type="button"
                    className={[
                      "scene-round-button",
                      isRecording ? "is-recording" : "",
                    ].join(" ")}
                    disabled={completed}
                    onClick={isRecording ? stopRecording : startRecording}
                    aria-label={isRecording ? "停止录音" : "开始录音"}
                  >
                    {isRecording ? <Square size={24} /> : <Mic size={24} />}
                  </button>
                  {audioUrl ? (
                    <audio ref={audioPlaybackRef} src={audioUrl}>
                      <track kind="captions" />
                    </audio>
                  ) : null}
                  <button
                    type="button"
                    className={[
                      "scene-round-button",
                      "is-playback",
                      isPlayingBack ? "is-playing" : "",
                    ].join(" ")}
                    disabled={!audioUrl}
                    onClick={playRecording}
                    aria-label="回放录音"
                  >
                    <Play size={22} />
                  </button>
                  {recordingError ? (
                    <p className="scene-recording-error">{recordingError}</p>
                  ) : null}
                </div>
              </article>

              <article className="hanzi-practice-card">
                <div className="hanzi-profile">
                  <div className="hanzi-mini-card">
                    <div className="single-hanzi-char">{currentItem.character}</div>
                    <Volume2 size={25} />
                  </div>
                  <div className="hanzi-tags">
                    <span className="structure-tag">扌</span>
                    <span className="structure-tag">左右结构</span>
                  </div>

                  <div className="hanzi-reading-card">
                    <span className="pinyin-tag">{currentItem.pinyin}</span>
                    <div className="word-tags">
                      {currentItem.words.map((word) => (
                        <span key={word}>{word}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="stroke-panel">
                  <div className="stroke-panel-head">
                    <span>描红动画</span>
                    <button
                      type="button"
                      className="replay-button"
                      onClick={replayStrokeAnimation}
                    >
                      <Play size={15} />
                      点一下重播动画
                    </button>
                  </div>
                  <div className="stroke-board" aria-label={`${currentItem.character}描红动画`}>
                    <span className="stroke-board__ghost" aria-hidden="true">
                      {currentItem.character}
                    </span>
                    <span
                      key={`${currentItem.id}-${strokeReplayKey}`}
                      className="stroke-board__trace"
                      aria-hidden="true"
                    >
                      {currentItem.character}
                    </span>
                  </div>
                </div>

                <div className="single-hanzi-detail">
                  <section>
                    <span>意思</span>
                    <p>{currentItem.meaning}</p>
                  </section>
                  <section>
                    <span>例句</span>
                    <p>{currentItem.exampleSentence}</p>
                  </section>
                  <section>
                    <span>书写提示</span>
                    <p>{currentItem.strokeHint}</p>
                  </section>
                </div>
              </article>
            </>
          ) : null}

          <div className="hanzi-pager">
            <button
              type="button"
              className="icon-link hanzi-pager__prev"
              disabled={currentIndex === 0}
              onClick={goToPrevious}
              aria-label="上一个字"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="hanzi-page-count" aria-label="生字进度">
              {currentIndex + 1} / {taskItems.length}
            </div>

            {isLastPage ? (
              <button
                type="button"
                className="checkin-submit-button"
                onClick={submitCheckIn}
              >
                <CheckCircle2 size={18} />
                {completed ? "查看奖励" : "提交打卡"}
              </button>
            ) : null}

            <button
              type="button"
              className="icon-link hanzi-pager__next"
              disabled={currentIndex === taskItems.length - 1}
              onClick={goToNext}
              aria-label="下一个字"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {showReward ? (
        <div className="reward-overlay" role="dialog" aria-modal="true">
          <div className="reward-modal">
            <Sparkles className="reward-spark reward-spark--left" size={34} />
            <Sparkles className="reward-spark reward-spark--right" size={28} />
            <div className="reward-gift">
              <Gift size={54} />
            </div>
            <p className="reward-eyebrow">打卡成功</p>
            <h2>+{CHECKIN_REWARD_POINTS} 积分</h2>
            <p>奖励已放进成长背包啦</p>
            <button
              type="button"
              className="primary-button"
              onClick={() => setShowReward(false)}
            >
              开心收下
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
