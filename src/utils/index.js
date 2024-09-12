export const createWatermark = (data) => {
    let {content, fontSize, fontFamily, color, rotate, opacity = 1, imgWatermarkBase64, density} = data;
    console.log(rotate)
    return new Promise((res) => {
        if (content === "" && imgWatermarkBase64) {
            const img = new Image();
            img.src = imgWatermarkBase64;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            img.onload = () => {
                const norm = Math.max(img.width, img.height);
                canvas.width = norm * density;
                canvas.height = norm * density;
                ctx.globalAlpha = opacity;
                const padding = (density - 1) / 2;
                rotate = rotate % 360;
                const r = (rotate * Math.PI) / 180;
                if (rotate >= 0 && rotate <= 90) {
                    ctx.translate(
                        norm * (1 - Math.cos(r) + padding),
                        norm * padding
                    );
                } else if (rotate > 90 && rotate <= 180) {
                    ctx.translate(
                        norm * (1 + padding),
                        norm * (1 - Math.sin(r) + padding)
                    );
                } else if (rotate > 180 && rotate <= 270) {
                    ctx.translate(
                        norm * (Math.abs(Math.cos(r)) + padding),
                        norm * (1 + padding)
                    );
                } else if (rotate > 270 && rotate < 360) {
                    ctx.translate(
                        norm * padding,
                        norm * (Math.abs(Math.sin(r)) + padding)
                    );
                }
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowBlur = 2;
                ctx.rotate((rotate * Math.PI) / 180);
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = "rgba(0,0,0,0.3)"
                ctx.fillRect(0, 0, img.width, img.height);
                const url = canvas.toDataURL("image/png");
                // console.log(url);
                canvas.remove();
                res(url);
            };
        } else {
            const canvas = document.createElement("canvas");
            const norm = content.length * fontSize;
            canvas.width = norm * density;
            canvas.height = norm * density;
            const ctx = canvas.getContext("2d");
            ctx.globalAlpha = opacity;
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 2;
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = color;
            ctx.rotate((rotate * Math.PI) / 180);
            ctx.textAlign = "left";
            ctx.fillText(content, -ctx.measureText(content).width / 2, 0);
            const url = canvas.toDataURL("png");
            canvas.remove();
            res(url);
        }
    });
};
