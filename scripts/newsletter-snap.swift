// Renders a page in WebKit (the engine Apple Mail uses) and saves a full-length PNG.
// Usage: newsletter-snap URL OUT.png WIDTH. Built and run by `npm run newsletter snap`.

import AppKit
import WebKit

let args = CommandLine.arguments
let url = URL(string: args[1])!, out = args[2], width = CGFloat(Double(args[3])!)

final class Snapper: NSObject, WKNavigationDelegate {
    let view: WKWebView
    init(width: CGFloat) {
        view = WKWebView(frame: NSRect(x: 0, y: 0, width: width, height: 800))
        super.init()
        view.navigationDelegate = self
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 6.0) {
            webView.evaluateJavaScript("document.documentElement.scrollHeight") { height, _ in
                let h = (height as? CGFloat) ?? 3000
                webView.frame = NSRect(x: 0, y: 0, width: width, height: h)
                DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) {
                    let config = WKSnapshotConfiguration()
                    config.rect = NSRect(x: 0, y: 0, width: width, height: h)
                    webView.takeSnapshot(with: config) { image, error in
                        guard let image, let tiff = image.tiffRepresentation,
                              let png = NSBitmapImageRep(data: tiff)?.representation(using: .png, properties: [:]) else {
                            print("snapshot failed: \(String(describing: error))"); exit(1)
                        }
                        try! png.write(to: URL(fileURLWithPath: out))
                        print("wrote \(out) \(Int(width))x\(Int(h))"); exit(0)
                    }
                }
            }
        }
    }
}

let app = NSApplication.shared
let snapper = Snapper(width: width)
let window = NSWindow(contentRect: snapper.view.frame, styleMask: [.borderless], backing: .buffered, defer: false)
window.contentView = snapper.view
snapper.view.load(URLRequest(url: url))
DispatchQueue.main.asyncAfter(deadline: .now() + 40) { print("timeout"); exit(2) }
app.run()
