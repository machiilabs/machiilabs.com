import { Fragment, type ReactNode } from "react";
import { manualSectionId } from "./manual";
import { ManualInline } from "./manual-inline";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={manualSectionId(title)} className="scroll-mt-8">
      <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-[#374151]">
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: string }) {
  return (
    <p>
      <ManualInline text={children} />
    </p>
  );
}

function Parts({
  rows,
}: {
  rows: { type: string; parameters: string; sample: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e5e7eb] text-[#1a1a1a]">
            <th className="py-2 pr-3 font-semibold">Type</th>
            <th className="py-2 pr-3 font-semibold">Parameters</th>
            <th className="py-2 font-semibold">Sample</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.type}-${row.parameters}`} className="border-b border-[#f3f4f6]">
              <td className="py-2 pr-3 whitespace-nowrap">{row.type}</td>
              <td className="py-2 pr-3">{row.parameters}</td>
              <td className="py-2 font-mono text-[0.8125rem]">{row.sample}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Results({
  rows,
}: {
  rows: { from: string; to: string; because?: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e5e7eb] text-[#1a1a1a]">
            <th className="py-2 pr-3 font-semibold">Now</th>
            <th className="py-2 pr-3 font-semibold">New name</th>
            <th className="py-2 font-semibold">Why</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.from} className="border-b border-[#f3f4f6] align-top">
              <td className="py-2 pr-3 font-mono text-[0.8125rem]">{row.from}</td>
              <td className="py-2 pr-3 font-mono text-[0.8125rem]">{row.to}</td>
              <td className="py-2 text-[#4b5563]">{row.because}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Example({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-lg border border-[#e7d7c3] bg-[#fbf7f1] px-4 py-4 sm:px-5">
      <p className="text-xs font-semibold tracking-[0.14em] text-[#8a5a20] uppercase">
        {kicker}
      </p>
      <h3 className="mt-1 text-base font-semibold text-[#1a1a1a]">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </article>
  );
}

function FieldTable({
  groups,
}: {
  groups: {
    title: string;
    rows: { name: string; description: string; examples: string }[];
  }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm leading-snug">
        <thead>
          <tr className="border-b border-[#e5e7eb] text-[#1a1a1a]">
            <th className="py-2 pr-3 font-semibold">Name</th>
            <th className="py-2 pr-3 font-semibold">Description</th>
            <th className="py-2 font-semibold">Examples</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <Fragment key={group.title}>
              <tr>
                <th
                  colSpan={3}
                  className="pt-4 pb-1 text-left text-xs font-semibold tracking-[0.14em] text-[#8a5a20] uppercase"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.name} className="border-b border-[#f3f4f6] align-top">
                  <td className="py-2 pr-3 font-medium whitespace-nowrap text-[#1a1a1a]">
                    {row.name}
                  </td>
                  <td className="py-2 pr-3 text-[#374151]">{row.description}</td>
                  <td className="py-2 font-mono text-[0.8125rem] text-[#1a1a1a]">
                    {row.examples}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BulkRenameGuide() {
  return (
    <div className="mt-10 space-y-12">
      <div className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-4 sm:px-5">
        <p className="text-sm font-semibold text-[#1a1a1a]">Start here</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-[#374151] sm:text-base">
          <li>Filter or select the files you want to rename.</li>
          <li>Open Bulk Rename and stack the parts of the new name, top to bottom.</li>
          <li>Read First new name, then the preview. A row that is not OK will not be renamed.</li>
          <li>Click Rename N Files. Undo is there if the result is wrong.</li>
        </ol>
      </div>

      <Section title="What changes, and what stays">
        <P>Bulk Rename changes file names on disk, for many videos at once. Each file stays in the folder it is already in.</P>
        <P>The catalog remembers the previous name as Original File Name, so a search for the old name can still find the file.</P>
        <P>Title is the name you see in the library, and it is separate from the file name. If Title still matches the file name, Skagway updates Title to the new file name. A Title you set yourself stays.</P>
        <P>Characters a file name cannot hold are rewritten as the name is built. A slash, backslash, colon, asterisk, question mark, quote, or vertical bar does not survive. A × becomes x. A name longer than 255 bytes is shortened to fit. A leading dot is removed, so the file does not become hidden.</P>
      </Section>

      <Section title="Choose the files">
        <P>File → Bulk Rename… renames every video in the current view. Search and filters count. If the window still shows the whole library, that is the set.</P>
        <P>Select the videos first, then right-click → Bulk Rename…, to rename only that selection. A command on one selected clip applies to every selected clip.</P>
        <P>The line under the window title names the set, for example “12 filtered videos · Preview before applying.” Nothing is written until you click Rename N Files.</P>
      </Section>

      <Section title="How the window is laid out">
        <P>The window opens with three parts already filled in: Title, a dot, and Extension. For a file named IMG_2044.mov whose Title is Harbor, First new name reads Harbor.mov. Change the parts, or add to them. The window can be resized.</P>
        <P>New name is the stack of parts, in order from top to bottom. The last row is blank. Choose a type there, or start typing, and that row becomes a part. A new blank row appears under it. On each part, the arrows move it earlier or later, and the trash button removes it.</P>
        <P>The columns are Type, Parameters, Case, and Sample. Sample is that part’s piece of the first file. A dash means the part adds nothing for that file. Rest the pointer on the dash to see why.</P>
        <P>First new name is the whole new name of the first file in the preview, with the name it has now underneath. It updates while you edit. If that first file would be skipped, the reason is under the name.</P>
        <P>Preview lists every file: Current File Name, New File Name, and Status. Sort, above the list, sets the order of the list, the order of the numbers, and the order of the rename. File Name, ascending, is the default. A file with no value for the chosen field sorts last.</P>
      </Section>

      <Section title="The parts">
        <P>A new name is a stack of parts. Skagway joins them in order. You do not type a pattern string.</P>
        <P>Text is characters you type: a word, a hyphen, the dot before the extension.</P>
        <P>A field inserts something Skagway already knows. The Type menu groups those fields as Identity, Media, Library, and Custom. Custom is there when this library has custom fields.</P>
        <P>Number counts through the files in preview order.</P>
        <P>If taken adds text only when the new name is already taken. When the name is free, that part adds nothing.</P>
      </Section>

      <Section title="Examples">
        <P>Each example is a whole recipe. The Sample column is the first file. Build the same parts, in the same order, and the preview should match the results.</P>

        <Example kicker="Example 1" title="Title, then the extension">
          <P>This is the recipe the window opens with. The catalog title replaces the camera’s file name. The extension stays.</P>
          <Parts
            rows={[
              { type: "Title", parameters: "Whole value", sample: "Harbor" },
              { type: "Text", parameters: ".", sample: "." },
              { type: "Extension", parameters: "Whole value", sample: "mov" },
            ]}
          />
          <Results
            rows={[
              { from: "IMG_2044.mov", to: "Harbor.mov", because: "Title is Harbor" },
              { from: "IMG_2090.mov", to: "Market.mov", because: "Title is Market" },
            ]}
          />
        </Example>

        <Example kicker="Example 2" title="A number, in the order of the preview">
          <P>Add a Number part when every file should get its own place in one sequence. Sort is File Name, ascending, so IMG_2044 comes before IMG_2045. The number does not restart when the title changes.</P>
          <Parts
            rows={[
              { type: "Title", parameters: "Whole value", sample: "Harbor" },
              { type: "Text", parameters: "-", sample: "-" },
              { type: "Number", parameters: "01", sample: "01" },
              { type: "Text", parameters: ".", sample: "." },
              { type: "Extension", parameters: "Whole value", sample: "mov" },
            ]}
          />
          <Results
            rows={[
              { from: "IMG_2044.mov", to: "Harbor-01.mov", because: "First in the list" },
              { from: "IMG_2045.mov", to: "Harbor-02.mov", because: "Same title, next number" },
              { from: "IMG_2090.mov", to: "Market-03.mov", because: "The sequence continues" },
            ]}
          />
          <P>Type 1 and the names are Harbor-1.mov, Harbor-2.mov, Harbor-3.mov. Type 001 and the names stay three digits. The digits you type are both the starting number and the width. 015 continues 016, 017.</P>
          <P>Change Sort when the sequence should follow something else. Date Created, ascending, numbers the oldest file first. Number, If taken, Today’s date, and Random id are not in the Sort menu, because the rename creates them.</P>
        </Example>

        <Example kicker="Example 3" title="Leave a unique name alone">
          <P>Use If taken when a repeated name needs a suffix and a unique name should stay clean. The three boxes are the text before the number, the number, and the text after the number. Here the before box is a hyphen, the number is 1, and the after box is empty.</P>
          <Parts
            rows={[
              { type: "Title", parameters: "Whole value", sample: "Harbor" },
              { type: "If taken", parameters: "-   1   (nothing after)", sample: "-1" },
              { type: "Text", parameters: ".", sample: "." },
              { type: "Extension", parameters: "Whole value", sample: "mov" },
            ]}
          />
          <Results
            rows={[
              { from: "IMG_2044.mov", to: "Harbor-1.mov", because: "Two files would both be Harbor.mov" },
              { from: "IMG_2045.mov", to: "Harbor-2.mov", because: "The next free number" },
              { from: "IMG_2090.mov", to: "Market.mov", because: "Market is unique, so If taken adds nothing" },
            ]}
          />
          <P>Sample shows the first file. Here that file is one of the Harbors, so If taken shows -1. Market is later in the list, and its If taken part is empty. A dash in Sample means that part adds nothing for the first file. It does not mean the part is unused for the rest of the list.</P>
          <P>It also fills in when a file already in that folder has the new name, and that file is not one of the files being renamed away. Two results in the same folder still have to be different. If they are not, the preview says Collision and those rows are skipped.</P>
          <P>Put text after the number when you want it only on a collision. Before empty, number 1, after a hyphen, between the text City- and the text city, turns City-city.mp4 into City-1-city.mp4 and City-2-city.mp4. A file that does not collide stays City-city.mp4.</P>
        </Example>

        <Example kicker="Example 4" title="Today’s date and the old name">
          <Parts
            rows={[
              { type: "Today's date", parameters: "yyyy-MM-dd", sample: "2026-11-01" },
              { type: "Text", parameters: "-", sample: "-" },
              { type: "Name without extension", parameters: "Whole value", sample: "interview" },
              { type: "Text", parameters: ".", sample: "." },
              { type: "Extension", parameters: "Whole value", sample: "mp4" },
            ]}
          />
          <Results
            rows={[
              {
                from: "interview.mp4",
                to: "2026-11-01-interview.mp4",
                because: "The date is the day you rename",
              },
            ]}
          />
        </Example>

        <Example kicker="Example 5" title="Keep only the text after a separator">
          <P>Name without extension, with Keep set to After the first and the separator set to space-hyphen-space. The first time that separator appears is the cut. A later hyphen stays in the kept text. A file with no such separator keeps its whole name.</P>
          <Parts
            rows={[
              {
                type: "Name without extension",
                parameters: "After the first  “ - ”",
                sample: "Take 2",
              },
              { type: "Text", parameters: ".", sample: "." },
              { type: "Extension", parameters: "Whole value", sample: "mov" },
            ]}
          />
          <Results
            rows={[
              { from: "Interview - Take 2.mov", to: "Take 2.mov", because: "Text after the first “ - ”" },
              { from: "Interview.mov", to: "Interview.mov", because: "No separator, so the whole name stays" },
            ]}
          />
          <P>Before the first, with the same separator, keeps Interview and drops the rest.</P>
        </Example>

        <Example kicker="Example 6" title="A blank date does not leave a stray hyphen">
          <P>An empty field adds nothing. A short separator just before it is left out too. The separator has to be one to three characters, and only spaces, hyphens, underscores, or dots. Title, then -, then Last Played, then a dot and Extension:</P>
          <Results
            rows={[
              { from: "Harbor.mov", to: "Harbor-2026-11-01.mov", because: "Played on that day" },
              { from: "Market.mov", to: "Market.mov", because: "Never played, so the hyphen is left out" },
            ]}
          />
          <P>A hyphen that is part of a longer text part stays. The text Topic- is not a separator, so an empty field after it still leaves Topic- in the name.</P>
        </Example>
      </Section>

      <Section title="Fields you can insert">
        <P>On a field, Keep is Whole value, Before the first, or After the first. Case is at the end of the row. A Format box appears for dates and for Duration.</P>
        <FieldTable
          groups={[
            {
              title: "Identity",
              rows: [
                { name: "Name without extension", description: "The file name, with the extension taken off.", examples: "interview" },
                { name: "Title", description: "The name in the library. It can already differ from the file name.", examples: "Harbor" },
                { name: "File Name", description: "The current file name, extension included.", examples: "IMG_2044.mov" },
                { name: "Original File Name", description: "The name from before the last rename Skagway recorded.", examples: "IMG_2044.mov" },
                { name: "Extension", description: "The extension, with no dot. A Text part of “.” in front of it supplies the dot.", examples: "mov" },
                { name: "Parent Folder", description: "The folder the file is in.", examples: "Wedding" },
                { name: "Volume", description: "The disk name. A file on the startup disk comes through as a hyphen.", examples: "Archive" },
                { name: "Path", description: "The full path. Slashes become hyphens.", examples: "Users-alex-Movies-Wedding-IMG_2044.mov" },
                { name: "Database ID", description: "The library’s number for that video.", examples: "1842" },
              ],
            },
            {
              title: "Media",
              rows: [
                { name: "Duration", description: "The length, written so it can sit in a file name. A format changes it.", examples: "1h02m03s, or 90 with mmm" },
                { name: "Width", description: "The picture width in pixels.", examples: "1920" },
                { name: "Height", description: "The picture height in pixels.", examples: "1080" },
                { name: "Resolution", description: "Width and height. The × becomes an x.", examples: "1920 x 1080" },
                { name: "Quality", description: "The size label Skagway uses for filters.", examples: "1080p" },
                { name: "Codec", description: "The codec stored for the file.", examples: "H.264" },
                { name: "Frame Rate", description: "Frames per second.", examples: "23.976" },
                { name: "File Size (bytes)", description: "The size in bytes.", examples: "48234496" },
                { name: "Subtitles", description: "What kind of subtitles Skagway found.", examples: "None, Sidecar, Burned-in" },
              ],
            },
            {
              title: "Library",
              rows: [
                { name: "Rating", description: "The star count. Unrated is 0, and 0 is still written.", examples: "4" },
                { name: "Tags", description: "The tag names. A bar between tags becomes a hyphen.", examples: "city-night" },
                { name: "Plays", description: "How many times the video has been played.", examples: "3" },
                { name: "Date Imported", description: "When the video entered this library.", examples: "2026-03-14" },
                { name: "Date Created", description: "The file’s creation date, when it has one.", examples: "2024-06-02" },
                { name: "Last Played", description: "When it was last played. Blank until then.", examples: "2026-11-01" },
                { name: "Content Fingerprint", description: "The long id used to spot duplicates.", examples: "e3b0c44298fc1c14" },
                { name: "Resume Position", description: "Where playback will resume, in seconds.", examples: "90" },
                { name: "Unplayable", description: "Whether this Mac can play the file.", examples: "true" },
                { name: "Missing File", description: "Whether the file is missing from disk.", examples: "false" },
                { name: "Duplicate", description: "Whether the file is in a duplicate group.", examples: "false" },
                { name: "Date Converted", description: "When a playable copy was made.", examples: "2026-10-02" },
                { name: "Today's date", description: "The day of the rename.", examples: "2026-11-01" },
                { name: "Random id", description: "Eight characters, different for each file. A new preview can show a different id. The id in the preview you rename from is the one written.", examples: "3f9a1c2b" },
              ],
            },
            {
              title: "Custom",
              rows: [
                { name: "Your fields", description: "Each custom field in this library, under its own name. A date field has a Format box. A blank value is left out.", examples: "Acme, or 2026-04-01" },
              ],
            },
          ]}
        />
      </Section>

      <Section title="Numbers and names already taken">
        <P>Number steps once per file, in the preview’s current order. The first file gets the number you typed. 1 goes 1, 2, 3. 01 goes 01, 02, 03. 015 goes 015, 016, 017.</P>
        <P>If taken is three boxes: text before the number, the number, and text after the number. The new part starts as a hyphen, then 1, then an empty after box. Clear the hyphen if you do not want it. The number box uses the same width rule as Number, so 01 is 01, 02, 03.</P>
        <P>The whole If taken part is empty when the new name is free. It is filled in when two files in this batch would land on the same name in the same folder, or when some other file already in that folder already has the name.</P>
        <P>Without If taken, a repeated result is a Collision. Those rows stay as they are. Rename N Files does not include them. Add If taken, or change the parts, until the preview no longer says Collision.</P>
      </Section>

      <Section title="Dates, duration, and case">
        <P>Today's date, Date Created, Date Imported, the date last played, and Date Converted take a format. Leave it empty and the date is yyyy-MM-dd, such as 2026-11-01. MMM-yyyy is Nov-2026. The letters are the usual date pattern: yyyy is the year, MM is the month number, MMM is the short month name, dd is the day.</P>
        <P>Duration with an empty format is a length that is safe in a file name: 1h02m03s, 12m34s, or 45s. mmm is the total minutes. sss is the total seconds. hhh is the total hours. hh, mm, and ss are the hours, minutes, and seconds of the clock time, not the totals. A 90-minute video is 1h30m00s, or 90 with mmm.</P>
        <P>Case applies to a field after any cut. As written leaves the text alone. lowercase and UPPERCASE change all of it. Title Case capitalizes each word, The Quick Brown Fox. Name case capitalizes the first letter only, The quick brown fox.</P>
      </Section>

      <Section title="Before and after a separator">
        <P>Keep has three choices. Whole value uses the field as it is. Before the first keeps the text before the first time the separator appears. After the first keeps the text after that, and a later copy of the separator stays.</P>
        <P>The separator is the exact characters you type, including spaces. For City-roll-a, Before the first - is City. After the first - is roll-a. If the separator is not in the value, the whole value is kept.</P>
        <P>The cut happens before Case. Title Case still applies to the piece you kept.</P>
      </Section>

      <Section title="When a field is empty">
        <P>An empty field adds nothing. A short separator sitting just before it is left out as well, so the name does not pick up a dangling hyphen. The separator has to be one, two, or three characters long, and every character has to be a space, a hyphen, an underscore, or a dot.</P>
        <P>Text that is longer than that is a real part of the name. Topic- stays even when the next field is empty. So does a word with a hyphen inside it.</P>
        <P>The same rule is why the opening recipe does not become .mov when Title is empty. The dot is a one-character separator in front of Extension, and it is left out with the empty Title. The new name is then only the extension. Use Name without extension when Title might be empty.</P>
      </Section>

      <Section title="Read the preview">
        <P>The status line under the list is the count, such as “8 will rename · 1 warning · 2 skipped · 3 unchanged.” Rename N Files uses the “will rename” count. Skipped and unchanged rows are left on disk as they are.</P>
        <P>OK means the row will be renamed. No extension means it will still be renamed, and the new name has no extension. That is usually a missing Extension part, or a dot that was left out with an empty field.</P>
        <P>Unchanged means the new name is the name the file already has. Empty name means the parts added up to nothing. Collision means two files in the same folder would get the same name.</P>
        <P>Click a row to open the same three facts larger: the current name, the new name, and the status.</P>
      </Section>

      <Section title="Rename, then undo">
        <P>Click Rename N Files only after the preview is the list you want. The window stays open. A finished file says Renamed. A file that failed says why: it is missing, a file with that name is already in the folder, a move of that file is still in progress, or macOS refused the name. The status line reads “N files renamed.” or “N files renamed · N failed.”</P>
        <P>The main button becomes Done, which closes the window. Retry Failed is there when some files failed. It tries those files again and leaves the ones that already succeeded.</P>
        <P>Undo, on the status line, puts the names back. It shows its own progress, then lists the same files again, ready to rename, as they were when the window opened.</P>
        <P>After Done, the activity strip at the bottom of the library keeps “N files renamed · Undo” until you undo or run another rename. A later scan does not push that line off. Edit → Undo Rename does the same thing. ⌘Z is Undo Rename while that line is waiting. When it is not, ⌘Z is still Undo Reconnect.</P>
        <P>Undo is one step, not a stack. It restores the names from this rename. A file whose name you changed again after that is left as it is.</P>
        <P>While a rename is running, each file briefly has a temporary name and then the new name. If Skagway quits in the middle, the next launch puts that file back to the name it had before the rename.</P>
      </Section>

      <Section title="Templates">
        <P>The menu at the right of New name is Templates, or the name of the template that matches the parts you have now.</P>
        <P>Save As Template… asks for a name. Choosing that template later fills the parts in again.</P>
        <P>Saving under a name you already used replaces that template. Delete Template removes one.</P>
      </Section>
    </div>
  );
}
